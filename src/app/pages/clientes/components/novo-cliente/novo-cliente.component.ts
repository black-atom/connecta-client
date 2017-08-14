import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { ClienteService } from './../../../../shared/services/cliente-service/cliente.service';
import { formEnderecoControls } from './endereco/';
import { formContatoControls } from './contato/';


@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.scss']
})
export class NovoClienteComponent implements OnInit {

  dadosClienteForm: FormGroup;

  constructor(private _fb: FormBuilder, private _clienteService: ClienteService) {}

  ngOnInit() {
    this.dadosClienteForm = this._fb.group({
      cnpj_cpf: [''],
      razao_social: [''],
      inscricao_estadual: [''],
      nome_fantasia: [''],
      createdAt: [''],
      updatedAt: [''],
      contatos: this._fb.array([this._fb.group(formContatoControls)]),
      enderecos: this._fb.array([this._fb.group(formEnderecoControls)])
  });
}

  cadastrar(cliente) {
    this._clienteService.cadastrarCliente(cliente)
                        .subscribe(res => res);
                        this.dadosClienteForm.reset();
  }

}
