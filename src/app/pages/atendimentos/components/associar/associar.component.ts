import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbDateStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { NotificationsService } from 'angular2-notifications';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

import { AtendimentoService } from '../../../../shared/services/atendimento-service';
import { TIPOFUNCIONARIOMOCK } from './../../../../utils/mocks/tipo-funcionario.mock';
import { Atendimento } from './../../../../models';
import { Funcionario } from './../../../../models';
import { AtendimentosDisponiveisComponent } from './atendimentos-disponiveis';
import { FuncionarioService } from './../../../../shared/services';
import { NotificacaoService } from '../../../../shared/services/notificacao-service';


@Component({
  selector: 'app-associar',
  templateUrl: './associar.component.html',
  styleUrls: ['./associar.component.scss']
})
export class AssociarComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  public atendimentos: Atendimento[] = [];
  public atendimentoASerRemovido;
  public funcionarioSelecionado;
  public funcionario: Funcionario[];
  public funcoes = TIPOFUNCIONARIOMOCK;
  public funcao: string;
  public dataAssociar;

  model: any;

  public tecnicos$: Observable<Funcionario[]>;

  opcoesModalAtendimentos: NgbModalOptions = {
    size: 'lg'
  };


  constructor(private _funcionarioService: FuncionarioService,
              private _servicoModal: NgbModal,
              private _atendimentoService: AtendimentoService,
              private _ngbDateParserFormatter: NgbDateParserFormatter,
              private _notificacaoService: NotificacaoService) {}


  ngOnInit() {

  }

  listarAtendimentoAssociado(dataInformada: any) {

    dataInformada = this._ngbDateParserFormatter.format(this.model);
      const today = this.model;
      const searchDate = new Date(today.year, today.month - 1, today.day );

      this.dataAssociar = searchDate;

      this.tecnicos$ = this._atendimentoService.retornarAtendimentoPorData(searchDate)
      .switchMap(atendimentos => {
        return this._funcionarioService.retornarFuncionarioPorFuncao(TIPOFUNCIONARIOMOCK[2])
          .map(funcionarios => {

            return funcionarios.map(funcionario => {
              const atendimentoFuncionarios = atendimentos.filter(atendimento => atendimento.tecnico._id === funcionario._id);

              funcionario.atendimentos = atendimentoFuncionarios;
              return funcionario;
            });
          });
      });

  }


  retornarTodosAtendimentos() {
    this._atendimentoService.retornarTodos()
                            .subscribe(res => this.atendimentos = res);
  }

  abrirModal(funcionarioSelecionado) {
       const modalRef = this._servicoModal
                    .open(AtendimentosDisponiveisComponent, this.opcoesModalAtendimentos);

    modalRef.componentInstance.funcionarioSelecionado = funcionarioSelecionado;
    modalRef.componentInstance.dataAssociar = this.dataAssociar;

    modalRef.result.then((resultadoDaModal) => {

      const arrayDeAtendimentos = resultadoDaModal.map((atendimento) => {
        const tecnico = {
          nome : funcionarioSelecionado.nome,
          _id : funcionarioSelecionado._id
        };
        return (Object.assign({}, atendimento, { tecnico }));
       });
       this._atendimentoService
           .atualizarTodosAtendimentos(arrayDeAtendimentos)
           .subscribe((res) => {
             if (res) {
              this.listarAtendimentoAssociado(this.dataAssociar);
             }
            });
  });
}

abrirModalDeConfirmacao(conteudo, atendimento, funcionario) {
  this.funcionarioSelecionado = funcionario;
  this.atendimentoASerRemovido = atendimento;
  this._servicoModal.open(conteudo);
}

removerAtendimento(atendimento) {
  if (atendimento.inicio === null && atendimento.fim === null) {
    const nome = '';
    atendimento.tecnico = { nome };
    this.sub = this._atendimentoService.atualizarAtendimento(atendimento).subscribe((res) => {
      if (res) {
         this.listarAtendimentoAssociado(this.dataAssociar);
      }
    });
  } else {
    this.notificarAtendimentoConcluidoOuIniciado();
  }
}

  notificarAtendimentoConcluidoOuIniciado() {
    this._notificacaoService.notificarErro(
    'Erro',
    'Não é possível remover um atendimento iniciado ou concluído'
  );
}

  ngOnDestroy() {
    if (this.sub) {
    this.sub.unsubscribe();
    }
  }

}
