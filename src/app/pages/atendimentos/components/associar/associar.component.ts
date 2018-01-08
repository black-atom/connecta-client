import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

import { NotificationsService } from 'angular2-notifications';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { AtendimentoService, FuncionarioService } from '../../../../shared/services';
import { TIPOFUNCIONARIOMOCK } from './../../../../utils/mocks/tipo-funcionario.mock';
import { Atendimento, Funcionario } from './../../../../models';
import { AtendimentosDisponiveisComponent } from './atendimentos-disponiveis';
import { NotificacaoService } from '../../../../shared/services/notificacao-service';


@Component({
  selector: 'app-associar',
  templateUrl: './associar.component.html',
  styleUrls: ['./associar.component.scss']
})
export class AssociarComponent implements OnInit {
  public atendimentos: Atendimento[] = [];
  public atendimentoASerRemovido;
  public funcionarioSelecionado;

  private funcao = TIPOFUNCIONARIOMOCK[2];
  public dataSelecionada: any;
  private date = new Date();
  public inputDate: any;

  public tecnicos$: Observable<Funcionario[]>;

  opcoesModalAtendimentos: NgbModalOptions = {
    size: 'lg'
  };

  constructor(
    private _funcionarioService: FuncionarioService,
    private _servicoModal: NgbModal,
    private _atendimentoService: AtendimentoService,
    private _notificacaoService: NotificacaoService
  ) {}

  ngOnInit() {
    this.inputDate = {
      year: this.date.getFullYear(),
      day: this.date.getDate(),
      month: this.date.getMonth() + 1
    };
    this.getFuncionariosEAtendimentos();
  }

  getFuncionariosEAtendimentos() {
    this.tecnicos$ = this._funcionarioService
      .retornarFuncionarioPorFuncao(this.funcao)
      .switchMap(tecnicos =>
        this._atendimentoService
          .getAtendimentosAssociadoPorData(
            this.dataPassadoPeloUsuario(this.inputDate)
          )
          .map(atendimentos =>
            tecnicos.map(funcionario => {
              const atendimentoTecnico = atendimentos.filter(
                atendimento => atendimento.tecnico._id === funcionario._id
              )
              return { ...funcionario, atendimentos: atendimentoTecnico };
            }).sort((a, b) => {
              if (a.atendimentos.length > b.atendimentos.length) {
                return -1;
              }if (a.atendimentos.length < b.atendimentos.length) {
                return 1;
              }
              return 0;
            })
          )
      );
  }

  dataPassadoPeloUsuario(dataSelecionada) {
    const dataFormatada = new Date(
      dataSelecionada.year,
      dataSelecionada.month - 1,
      dataSelecionada.day
    );
    return dataFormatada;
  }

  abrirModal(funcionarioSelecionado) {
    const modalRef = this._servicoModal.open(
      AtendimentosDisponiveisComponent,
      this.opcoesModalAtendimentos
    );

    modalRef.componentInstance.funcionarioSelecionado = funcionarioSelecionado;
    modalRef.componentInstance.dataSelecionada = this.dataPassadoPeloUsuario(
      this.inputDate
    );

    modalRef.result
      .then(resultadoDaModal => {
        if (resultadoDaModal) {
          const arrayDeAtendimentos = resultadoDaModal.map(atendimento => {
            const tecnico = {
              nome: funcionarioSelecionado.nome,
              _id: funcionarioSelecionado._id
            };
            return Object.assign({}, atendimento, { tecnico });
          });
          this._atendimentoService
            .atualizarTodosAtendimentos(arrayDeAtendimentos)
            .subscribe(() => this.getFuncionariosEAtendimentos());
        }
      })
      .catch(() => {});
  }

  abrirModalDeConfirmacao(conteudo, atendimento, funcionario) {
    this.funcionarioSelecionado = funcionario;
    this.atendimentoASerRemovido = atendimento;
    this._servicoModal.open(conteudo);
  }

  removerAtendimento(atendimentoSelecionadoParaRemover) {
    const tecnico = { nome: '' };
    const atendimento = { ...atendimentoSelecionadoParaRemover, tecnico };
    this._atendimentoService
      .atualizarAtendimento(atendimento)
      .subscribe(() => this.getFuncionariosEAtendimentos());
  }

  notificarAtendimentoConcluidoOuIniciado() {
    this._notificacaoService.notificarErro(
      'Erro',
      'Não é possível remover um atendimento iniciado ou concluído'
    );
  }

}
