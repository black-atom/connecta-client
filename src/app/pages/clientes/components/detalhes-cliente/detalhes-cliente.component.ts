import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { formEnderecoControls } from './../../../../shared/components/endereco';
import { formContatoControls } from './../../../../shared/components/contato';
import { ClienteService } from './../../../../shared/services/cliente-service';
import { Cliente } from './../../../../models/cliente.interface';

@Component({
  selector: 'app-detalhes-cliente',
  templateUrl: './detalhes-cliente.component.html',
  styleUrls: ['./detalhes-cliente.component.scss']
})
export class DetalhesClienteComponent implements OnInit {

  formEditarCliente: FormGroup;
  id: string;
  private sub: any;
  cliente: Cliente;
  clienteRecebido: Cliente;
  desabilitaSelect = false;

  constructor(private route: ActivatedRoute,
              private _clientService: ClienteService,
              private _fb: FormBuilder) { }

  ngOnInit() {
    this.iniciarForm();
    this.obterId();

    // this.dadosDoCliente();
  }

  iniciarForm() {
    this.formEditarCliente = this._fb.group({
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

  obterId() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.recuperarCliente();
  });
}


  atualizarCliente(cliente) {
    this._clientService.atualizarCliente(cliente)
                        .subscribe(res => res);

    this.formEditarCliente.reset();
  }

  recuperarCliente() {
    this._clientService.retornarUm(this.id).subscribe((res) => {
      this.formEditarCliente.get('cnpj_cpf').patchValue(res.cnpj_cpf);
      this.formEditarCliente.get('razao_social').patchValue(res.razao_social);
      this.formEditarCliente.get('inscricao_estadual').patchValue(res.inscricao_estadual);
      this.formEditarCliente.get('nome_fantasia').patchValue(res.nome_fantasia);
      this.clienteRecebido = res;
    });

  }

}

