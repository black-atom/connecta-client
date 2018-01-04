import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { DadosEndereco, Funcionario } from './../../../../models';
import { CepService, FuncionarioService } from './../../../../shared/services';
import { NotificacaoService } from './../../../../shared/services/notificacao-service';
import { IFormCanDeactivate } from './../../../../shared/guards/form-candeactivate.interface';

@Component({
  selector: 'app-detalhes-funcionario',
  templateUrl: './detalhes-funcionario.component.html',
  styleUrls: ['./detalhes-funcionario.component.scss']
})
export class DetalhesFuncionarioComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  private subscription: Subscription;
  public formEdicaoFuncionario: FormGroup;
  private id: string;
  public funcionarioRecebido: Funcionario;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  public tipo: string[] = [];
  public editarCamposTipo: boolean = true;

  constructor(private _funcionarioService: FuncionarioService,
              private _activatedRoute: ActivatedRoute,
              private _cepService: CepService,
              private _notificacaoService: NotificacaoService,
              private _fb: FormBuilder,
              private _router: Router) { }


  ngOnInit() {
    this.iniciarFormFuncionario();
    this.obterIdFuncionario();
  }

  obterIdFuncionario() {
    this.subscription = this._activatedRoute.params.subscribe(params => this.id = params['id']);
     this.recuperarFuncionario();
  }


  iniciarFormFuncionario() {
    this.formEdicaoFuncionario = this._fb.group({
      nome: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      data_nasc: ['', [Validators.required]],

      login: this._fb.group({
        username: ['', Validators.required],
        password: [''],
        tipo: ['']
      }),
      habilitacao: this._fb.group({
        numero: [''],
        validade: ['']
      }),

      contato: this._fb.group({
        nome: ['', Validators.required],
        email: ['', [Validators.pattern(this.emailPattern)]],
        telefone: ['', [Validators.required]],
        celular: [''],
        observacao: ['']
      }),

      endereco: this._fb.group({
        cep: ['', [Validators.required]],
        rua: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        bairro: ['', [Validators.required]],
        complemento: [''],
        cidade: ['', [Validators.required]],
        uf: ['', [Validators.required]],
        ponto_referencia: ['']
      })
    });
 }

  recuperarFuncionario() {
    this.subscription = this._funcionarioService.retornarUm(this.id).subscribe((dados) => {
      dados.login.password = '';
      this.formEdicaoFuncionario.patchValue(dados);
      this.tipo = dados.login.tipo;
      this.funcionarioRecebido = dados;
    });
  }

  permissao(perm) {
    const index = this.tipo.indexOf(perm);
    if (perm && index === -1) {
      this.tipo.push(perm);
    }else if (index !== -1) {
      this.tipo.splice(index, 1, perm);
    }
  }


  replaceFieldsFuncionario(funcionario) {
    funcionario.cpf = funcionario.cpf.replace(/\D+/g, '');
    funcionario.rg = funcionario.rg.replace(/\D+/g, '');
    funcionario.contato.telefone = funcionario.contato.telefone.replace(/\D+/g, '');
    funcionario.endereco.cep = funcionario.endereco.cep.replace(/\D+/g, '');
    funcionario.contato.celular = funcionario.contato.celular.replace(/\D+/g, '');
    return funcionario;
  }

  atualizarTecnico(funcionario: Funcionario) {

    const funcionarioFormatado = this.replaceFieldsFuncionario(funcionario);
    funcionarioFormatado._id = this.id;
    funcionarioFormatado.login.tipo = this.tipo;

    if (funcionarioFormatado.login.hasOwnProperty('password') && funcionarioFormatado.login.password.length <= 0 ) {
          delete funcionarioFormatado.login.password;
    }

    this.subscription = this._funcionarioService.atualizarFuncionario(funcionarioFormatado)
      .subscribe(
          () => {},
            erro => this.falhaNaEdicao(),
            () => this.sucessoNaEdicao()
      );
  }

  podeDesativar() {
    if(this.formEdicaoFuncionario.touched) {
      if( confirm('Deseja sair da página? Todos os dados serão perdidos!')) {
        return true;
      } else {
        return false;
        }
    }
      return true;
  }

  sucessoNaEdicao() {
    this._notificacaoService.notificarSucesso(
      'Edição efetuada com sucesso!',
      ''
    );
  }

  falhaNaEdicao() {
    this._notificacaoService.notificarErro(
      'Não foi possível efetuar a edição',
      ''
      );
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
