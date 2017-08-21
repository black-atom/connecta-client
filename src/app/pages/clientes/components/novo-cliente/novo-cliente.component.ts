import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

import { Cliente } from './../../../../models';
import { ClienteService } from './../../../../shared/services/cliente-service';
import { formContatoControls } from './../../../../shared/components/contato';
import { formEnderecoControls } from './../../../../shared/components/endereco';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.scss']
})
export class NovoClienteComponent implements OnInit {

  public formCliente: FormGroup;
  public desabilitaElemento: boolean = true;

  get contatos(): FormArray { return this.formCliente.get('contatos') as FormArray; }
  get enderecos(): FormArray { return this.formCliente.get('enderecos') as FormArray; }

  constructor(private _fb: FormBuilder,
              private _clienteService: ClienteService,
              private _notificacaoService: NotificationsService) {}

  ngOnInit() {

      this.formCliente = this._fb.group({
              cnpj_cpf: ['', [Validators.required]],
              razao_social: ['', [Validators.required]],
              inscricao_estadual: [''],
              nome_fantasia: [''],
              createdAt: [''],
              updatedAt: [''],
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
      this._clienteService.novoCliente(cliente)
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
    this._notificacaoService.success(
      'Cadastro efetuado com sucesso!',
      '',
      {
        timeOut: 1000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
      }
    );
    this.formCliente.reset();
  }

  falhaNoCadastro() {
    this._notificacaoService.error(
      'Não foi possível efetuar o cadastro',
      '',
      {
        timeOut: 1000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
      }
    );
  }
}
