import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

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

  formCliente: FormGroup;
  desabilitaSelecionarEndereco = true;
  desabilitaSelecionarContato = true;

  constructor(private _fb: FormBuilder, 
              private _clienteService: ClienteService,
              private _notificacaoService: NotificationsService) {}

  ngOnInit() {
    this.formCliente = this._fb.group({
      cnpj_cpf: ['', [Validators.required]],
      razao_social: ['', [Validators.required]],
      inscricao_estadual: ['', [Validators.required]],
      nome_fantasia: ['', [Validators.required]],
      createdAt: [''],
      updatedAt: [''],
      contatos: this._fb.array([this._fb.group(formContatoControls)]),
      enderecos: this._fb.array([this._fb.group(formEnderecoControls)])
  });
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
