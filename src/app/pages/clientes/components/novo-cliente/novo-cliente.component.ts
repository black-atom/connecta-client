
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { ClienteService } from './../../../../shared/services/cliente-service/cliente.service';
import { formContatoControls } from './../../../../shared/components/contato/';
import { formEnderecoControls } from './../../../../shared/components/endereco/';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.scss']
})
export class NovoClienteComponent implements OnInit {

  dadosClienteForm: FormGroup;
  verificaCampoInput = true;

  constructor(private _fb: FormBuilder, private _clienteService: ClienteService) {}

  ngOnInit() {
    this.dadosClienteForm = this._fb.group({
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

  cadastrar(cliente) {
    this._clienteService.novo(cliente)
                        .subscribe(res => res);

    this.dadosClienteForm.reset();
  }

}
