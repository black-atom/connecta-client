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
  public dataSelecionada;

  model: any;

  public tecnicos: Observable<Funcionario[]>;

  opcoesModalAtendimentos: NgbModalOptions = {
    size: 'lg'
  };


  constructor(private _funcionarioService: FuncionarioService,
              private _servicoModal: NgbModal,
              private _atendimentoService: AtendimentoService,
              private _ngbDateParserFormatter: NgbDateParserFormatter,
              private _notificacaoService: NotificacaoService,
              ) {}


  ngOnInit() {

    this._atendimentoService.getAllAtendimentosAssociadosData(this.dataAgora());
    this.tecnicos = this._atendimentoService.funcionarios;

  }

  listarAtendimentoAssociado(dataInformada: any) {
    dataInformada = this._ngbDateParserFormatter.format(this.model);
      const today = this.model;
      const searchDate = new Date(today.year, today.month - 1, today.day );
      this.dataSelecionada = searchDate;
      this._atendimentoService.getAllAtendimentosAssociadosData(searchDate);
  }

  dataAgora() {
    const today = new Date();
    const hoje = ({ day: today.getDate(), month: today.getMonth(), year: today.getFullYear() } );
    const searchDate = new Date(hoje.year, hoje.month, hoje.day );
    this.model = { year: searchDate.getFullYear(), day: searchDate.getDate(), month: searchDate.getMonth() + 1 };

    return searchDate;

  }
  abrirModal(funcionarioSelecionado) {
       const modalRef = this._servicoModal
                    .open(AtendimentosDisponiveisComponent, this.opcoesModalAtendimentos);

    modalRef.componentInstance.funcionarioSelecionado = funcionarioSelecionado;
    modalRef.componentInstance.dataSelecionada = this.dataSelecionada;

    modalRef.result.then((resultadoDaModal) => {
          if (resultadoDaModal) {
            const arrayDeAtendimentos = resultadoDaModal.map((atendimento) => {
              const tecnico = {
                nome : funcionarioSelecionado.nome,
                _id : funcionarioSelecionado._id
              };
              return (Object.assign({}, atendimento, { tecnico }));
             });
             this._atendimentoService
                 .updateTodosAtendimentosAssociado(arrayDeAtendimentos);
          }
      });
}

abrirModalDeConfirmacao(conteudo, atendimento, funcionario) {
  this.funcionarioSelecionado = funcionario;
  this.atendimentoASerRemovido = atendimento;
  this._servicoModal.open(conteudo);
}

removerAtendimento(atendimento) {

  if (atendimento.inicio === null && atendimento.fim === null) {
   this._atendimentoService.removerAtendimentoAssociado(atendimento, atendimento.tecnico);
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
