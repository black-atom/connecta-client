import { Subscription } from 'rxjs/Rx';
import { NotificacaoService } from './../../../../shared/services/notificacao-service/notificacao.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from './../../../../shared/services/login-service/login.service';
import { Funcionario } from './../../../../models/funcionario.interface';
import { FuncionarioService } from './../../../../shared/services/funcionario-service/funcionario.service';
import { AtendimentoService } from './../../../../shared/services/atendimento-service/atendimento.service';
import { Atendimento } from 'app/models';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-desbloquear-modal',
  templateUrl: './desbloquear-modal.component.html',
  styleUrls: ['./desbloquear-modal.component.scss']
})
export class DesbloquearModalComponent implements OnInit, OnDestroy {

  @Input() atendimentoSelecionado;


  private subscription: Subscription;

  public latestAtendimentos$: Observable<Atendimento[]>;
  private atendimentoRecebido;

  public day = 30;
  public funcionarios$: Observable<Funcionario[]>;

  public formUnlock: FormGroup;

  constructor(
    public modalAtiva: NgbActiveModal,
    public atendimentoService: AtendimentoService,
    public funcionarioService: FuncionarioService,
    public loginService: LoginService,
    private _notificacaoService: NotificacaoService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.initForm();

    this.funcionarios$ = this.funcionarioService.retornarFuncionarioPorFuncao({ 'login.tipo': 'administrador' })
      .map(({ funcionarios }) => funcionarios);

    this.latestAtendimentos$ =
      this.atendimentoService.getLatestAtendimento(this.atendimentoSelecionado.cliente.cnpj_cpf, this.day);

    this.atendimentoService.retornarUm(this.atendimentoSelecionado._id)
      .subscribe(atendimento => this.atendimentoRecebido = atendimento);
   }

  initForm() {
    this.formUnlock = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  fecharModal() {
    this.modalAtiva.close(true);
    this.sucessoNaEdicao();
  }

  lastDay(day) {
    this.day = day;
    this.latestAtendimentos$ = this.atendimentoService.getLatestAtendimento(this.atendimentoSelecionado.cliente.cnpj_cpf, day);
  }

  autorizarVisita({ username, password }) {
    const supervisor = { username: username.toLowerCase(), password };
    this.subscription = this.loginService.logar(supervisor)
      // tslint:disable-next-line:variable-name
      .subscribe(({ funcionario: { _id, nome: nome_supervisor } }) => this.desbloquearAtendimento({ _id, nome_supervisor }));
  }

  desbloquearAtendimento(supervisor) {
    const atendimentoAlterado = { ...this.atendimentoRecebido, liberacao: supervisor, estado: 'agendado' };
    this.subscription = this.atendimentoService.atualizarAtendimento(atendimentoAlterado)
      .subscribe(data => data ? this.fecharModal() : this.falhaNaEdicao());
  }

  sucessoNaEdicao() {
    this._notificacaoService.notificarSucesso(
      'Visita no local autorizada com sucesso!',
      ''
    );
  }

  falhaNaEdicao() {
    this._notificacaoService.notificarErro(
      'Senha inválido',
      ''
      );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
