import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { Cliente } from './../../../../models';
import { ClienteService } from './../../../../shared/services';
import { formContatoControls } from './../../../../shared/components/contato';
import { formEnderecoControls } from './../../../../shared/components/endereco';
import { NotificacaoService } from '../../../../shared/services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.scss']
})
export class NovoClienteComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  public formCliente: FormGroup;
  public desabilitaElemento: boolean = true;

  get contatos(): FormArray { return this.formCliente.get('contatos') as FormArray; }
  get enderecos(): FormArray { return this.formCliente.get('enderecos') as FormArray; }

  constructor(private _fb: FormBuilder,
              private _clienteService: ClienteService,
              private _notificacaoService: NotificacaoService) {}

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
    const contatos: FormArray = <FormArray> this.formCliente.get('contatos');
    contatos.push(this._fb.group(formContatoControls));
  }

  adicionarEndereco() {
    const enderecos: FormArray = <FormArray> this.formCliente.get('enderecos');
    enderecos.push(this._fb.group(formEnderecoControls));
  }

  cadastrarCliente(cliente: Cliente) {

   cliente.cnpj_cpf = cliente.cnpj_cpf.replace(/\D+/g, '');
   cliente.inscricao_estadual = cliente.inscricao_estadual.replace(/\D+/g, '');

   cliente.contatos = cliente.contatos.map((removerMascaraContato) => {
      const novoContatos = {
          telefone: removerMascaraContato.telefone.replace(/\D+/g, ''),
          celular : removerMascaraContato.celular.replace(/\D+/g, '')
      };
     return (Object.assign({}, removerMascaraContato, novoContatos));
    });

    cliente.enderecos = cliente.enderecos.map((removerMascaraEndereco) => {
      const novoContatos = {
          cep: removerMascaraEndereco.cep.replace(/\D+/g, '')
      };
     return (Object.assign({}, removerMascaraEndereco, novoContatos));
    });

    this.sub = this._clienteService.novoCliente(cliente)
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

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
