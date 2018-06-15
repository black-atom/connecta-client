import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
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
export class AssociarComponent implements OnInit, OnDestroy {
  public atendimentos: Atendimento[] = [];
  public atendimentoASerRemovido;
  public funcionarioSelecionado;

  private funcao = { 'login.tipo': TIPOFUNCIONARIOMOCK[2] };
  public dataSelecionada: any;
  private date = new Date();
  public inputDate: any;
  private subscription: Subscription;
  atendimentoSelecionado;

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
      .map(({ funcionarios }) => funcionarios.filter(funcionario => funcionario.ativo))
      .switchMap(funcionarios =>
        this._atendimentoService
        .getAtendimentosPorData({
          estado: 'associado',
          data_atendimento: this.dataPassadoPeloUsuario(this.inputDate).toString()
        })
        .map(({ atendimentos }) =>
          funcionarios.map(funcionario => {
            const atendimentoTecnico = atendimentos.filter(
              atendimento => atendimento.tecnico._id === funcionario._id
            );
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
            const estado = 'associado';
            return { ...atendimento, tecnico, estado };
          });
          this.subscription = this._atendimentoService
            .atualizarTodosAtendimentos(arrayDeAtendimentos)
            .subscribe(() => this.getFuncionariosEAtendimentos());
        }
      })
      .catch(() => {});
  }

  abrirModalDeConfirmacao(conteudo, atendimento, funcionario) {
    this.subscription = this._atendimentoService.retornarUm(atendimento._id).subscribe(res => this.atendimentoSelecionado = res);
    this.funcionarioSelecionado = funcionario;
    this.atendimentoASerRemovido = this.atendimentoSelecionado;
    this._servicoModal.open(conteudo);
  }

  removerAtendimento() {
    const tecnico = { nome: null };
    const estado = 'agendado';
    const atendimento = { ...this.atendimentoSelecionado, tecnico, estado };

    this.subscription = this._atendimentoService
      .atualizarAtendimento(atendimento)
      .subscribe(() => this.getFuncionariosEAtendimentos());
  }

  notificarAtendimentoConcluidoOuIniciado() {
    this._notificacaoService.notificarErro(
      'Erro',
      'Não é possível remover um atendimento iniciado ou concluído'
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
