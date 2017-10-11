import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { NotificacaoService } from './../../../../shared/services';
import { DadosEndereco } from './../../../../models';
import { CepService } from './../../../../shared/services';
import { FuncionarioService } from './../../../../shared/services';
import { Funcionario } from './../../../../models';
import { IFormCanDeactivate } from './../../../../shared/guards/form-candeactivate.interface';

@Component({
  selector: 'app-novo-funcionario',
  templateUrl: './novo-funcionario.component.html',
  styleUrls: ['./novo-funcionario.component.scss']
})
export class NovoFuncionarioComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  private subscription: Subscription;
  public formFuncionario: FormGroup;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  public tipo: string[] = [];
  public editarCamposTipo = true;
  public permissaoRecebida;

   constructor(private _fb: FormBuilder,
               private _funcionarioService: FuncionarioService,
               private _notificacaoService: NotificacaoService) {}

   ngOnInit() {
    this.iniciarFormFuncionario();
   }

   iniciarFormFuncionario() {
      this.formFuncionario = this._fb.group({

        nome: ['', [Validators.required]],
        rg: ['', [Validators.required]],
        cpf: ['', [Validators.required]],
        data_nasc: ['', [Validators.required]],

        login: this._fb.group({
          username: ['', [Validators.required]],
          password: ['', [Validators.required]],
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


   permissao(perm) {
     this.tipo = perm;
   }

   cadastrarTecnico(funcionario: Funcionario) {
    funcionario.login.tipo = this.tipo;
     funcionario.cpf = funcionario.cpf.replace(/\D+/g, '');
     funcionario.rg = funcionario.rg.replace(/\D+/g, '');
     funcionario.contato.telefone = funcionario.contato.telefone.replace(/\D+/g, '');
     funcionario.endereco.cep = funcionario.endereco.cep.replace(/\D+/g, '');
     if (funcionario.contato.celular) {
      funcionario.contato.celular = funcionario.contato.celular.replace(/\D+/g, '');
     }
     funcionario.login.tipo = this.tipo;

     this.subscription = this._funcionarioService.novoFuncionario(funcionario)
    .subscribe(
      dados => {
    },
      erro => {
      this.falhaNoCadastro();
    },
      () => {
      this.sucessoNoCadastro();
    }
  );
}

podeDesativar() {
  if(this.formFuncionario.touched) {
    if( confirm('Deseja sair da página? Todos os dados serão perdidos!')) {
      return true;
    } else {
      return false;
      }
  }
    return true;
}

sucessoNoCadastro() {
  this._notificacaoService.notificarSucesso(
    'Cadastro efetuado com sucesso!',
    ''
  );
    this.formFuncionario.reset();
}

falhaNoCadastro() {
  this._notificacaoService.notificarErro(
    'Não foi possível efetuar o cadastro',
    ''
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

