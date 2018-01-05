import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    const index = this.tipo.indexOf(perm);
    if (perm && index === -1) {
      this.tipo.push(perm);
    }else if (index !== -1) {
      this.tipo.splice(index, 1, perm);
    }
  }

  replaceFieldsFuncionario(funcionario: Funcionario) {

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

    return { ...funcionario, ...functionarioFormatado, contato, endereco };
  }


  cadastrarTecnico(funcionario: Funcionario) {

    const funcionarioFormatado = this.replaceFieldsFuncionario(funcionario);
    funcionarioFormatado.login.tipo = this.tipo;

    this.subscription = this._funcionarioService.novoFuncionario(funcionarioFormatado)
      .subscribe(
        () => {},
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

