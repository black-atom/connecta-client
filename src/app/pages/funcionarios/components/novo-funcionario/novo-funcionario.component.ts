import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { NotificacaoService, FuncionarioService, CepService } from './../../../../shared/services';
import { DadosEndereco, Funcionario } from './../../../../models';
import { IFormCanDeactivate } from './../../../../shared/guards/form-candeactivate.interface';
import { removeMaskFromProp } from 'app/shared/utils/StringUtils';

@Component({
  selector: 'app-novo-funcionario',
  templateUrl: './novo-funcionario.component.html',
  styleUrls: ['./novo-funcionario.component.scss']
})
export class NovoFuncionarioComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  private subscription: Subscription;
  public formFuncionario: FormGroup;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  public editarCamposTipo = true;

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
        tipo: this._fb.array([
          new FormControl(''),
          new FormControl('')
        ])
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
      }),
      ativo: [true, Validators.required]
    });
  }


  replaceFieldsFuncionario(funcionario) {

    const functionarioFormatado = {
      cpf : removeMaskFromProp('cpf')(funcionario),
      rg : removeMaskFromProp('rg')(funcionario)
    };

    const contato = {
      ...funcionario.contato,
      telefone : removeMaskFromProp('telefone')(funcionario.contato),
      celular : removeMaskFromProp('celular')(funcionario.contato)
    };

    const endereco = {
      ...funcionario.endereco,
      cep : removeMaskFromProp('cep')(funcionario.endereco)
    };


    const ativo = funcionario.ativo === 'true' || funcionario.ativo === true ? true : false;

    const login = {
      ...funcionario.login,
      tipo: funcionario.login.tipo.filter(t => t.length > 0)
    };

    return { ...funcionario, ...functionarioFormatado, contato, endereco, ativo, login };
  }


  cadastrarTecnico(funcionario: Funcionario) {
    const funcionarioFormatado = this.replaceFieldsFuncionario(funcionario);

    this.subscription = this._funcionarioService.novoFuncionario(funcionarioFormatado)
      .subscribe(
        (res) => res ? this.iniciarFormFuncionario() : {},
          erro => this.falhaNoCadastro(),
            () => this.sucessoNoCadastro()
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

