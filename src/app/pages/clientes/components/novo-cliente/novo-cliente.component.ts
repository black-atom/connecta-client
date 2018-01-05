import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { Cliente } from './../../../../models';
import { ClienteService } from './../../../../shared/services';
import { formContatoControls } from './../../../../shared/components/contato';
import { formEnderecoControls } from './../../../../shared/components/endereco';
import { NotificacaoService } from '../../../../shared/services';
import { Router } from '@angular/router';
import { IFormCanDeactivate } from './../../../../shared/guards/form-candeactivate.interface';
import { removeMaskFromProp } from 'app/shared/utils/StringUtils';


@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.scss']
})
export class NovoClienteComponent
  implements OnInit, OnDestroy, IFormCanDeactivate {
  private subscription: Subscription;
  public formCliente: FormGroup;
  public desabilitaElemento: boolean = true;

  get contatos(): FormArray {
    return this.formCliente.get('contatos') as FormArray;
  }
  get enderecos(): FormArray {
    return this.formCliente.get('enderecos') as FormArray;
  }

  constructor(
    private _fb: FormBuilder,
    private _clienteService: ClienteService,
    private _notificacaoService: NotificacaoService
  ) {}

  ngOnInit() {
    this.formCliente = this._fb.group({
      cnpj_cpf: ['', [Validators.required]],
      nome_razao_social: ['', [Validators.required]],
      inscricao_estadual: [''],
      nome_fantasia: [''],
      contatos: this._fb.array([]),
      enderecos: this._fb.array([])
    });
    this.adicionarContato();
    this.adicionarEndereco();
  }

  removerContato(index) {
    this.contatos.removeAt(index);
  }

  removerEndereco(index) {
    this.enderecos.removeAt(index);
  }

  adicionarContato() {
    const contatos: FormArray = <FormArray>this.formCliente.get('contatos');
    contatos.push(this._fb.group(formContatoControls));
  }

  adicionarEndereco() {
    const enderecos: FormArray = <FormArray>this.formCliente.get('enderecos');
    enderecos.push(this._fb.group(formEnderecoControls));
  }

  replaceFieldsCliente(cliente: Cliente) {

    const dadosClienteFormatado = {
      cnpj_cpf: removeMaskFromProp('cnpj_cpf')(cliente),
      inscricao_estadual: removeMaskFromProp('inscricao_estadual')(cliente)
    };

    const contatos = cliente.contatos.map(contato => {
      const telefonesFormatado = {
        telefone: removeMaskFromProp('telefone')(contato),
        celular: removeMaskFromProp('celular')(contato)
      };
      return { ...contato, ...telefonesFormatado };
    });

    const enderecos = cliente.enderecos.map(endereco => {
      const cepFormatado = {
        cep: removeMaskFromProp('cep')(endereco)
      };
      return { ...endereco, ...cepFormatado };
    });

    return { ...cliente, ...dadosClienteFormatado, contatos, enderecos };
  }

  cadastrarCliente(cliente: Cliente) {
   const clienteFormatado = this.replaceFieldsCliente(cliente);
      this.subscription = this._clienteService.novoCliente(clienteFormatado)
        .subscribe(
          dados => {
        },
          erro => {
          if (erro === 'Ocorreu o erro 409') {
            this.falhaCPFCNPJExistente();
          } else {
            this.falhaNoCadastro();
          }
        },
          () => {
          this.sucessoNoCadastro();
        }
      );
  }

  podeDesativar() {
    if (this.formCliente.touched) {
      if (confirm('Deseja sair da página? Todos os dados serão perdidos!')) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

  sucessoNoCadastro() {
    this._notificacaoService.notificarSucesso(
      'Cliente cadastrado com sucesso',
      ''
    );
    this.formCliente.reset();
  }

  falhaNoCadastro() {
    this._notificacaoService.notificarErro(
      'Não foi possível efetuar o cadastro',
      ''
    );
  }

  falhaCPFCNPJExistente() {
    this._notificacaoService.notificarErro(
      'Já existe cliente com o CPF/CNPJ informado',
      ''
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
