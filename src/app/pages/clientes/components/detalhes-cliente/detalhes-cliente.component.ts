import { formEnderecoControls } from './../../../../shared/components/endereco/form-endereco-controls';
import { formContatoControls } from './../../../../shared/components/contato/form-contato-controls';
import { ClienteService } from './../../../../shared/services/cliente-service/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Cliente } from './../../../../models/cliente.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhes-cliente',
  templateUrl: './detalhes-cliente.component.html',
  styleUrls: ['./detalhes-cliente.component.scss']
})
export class DetalhesClienteComponent implements OnInit {

  dadosClienteEdicaoForm: FormGroup;
  id: string;
  private sub: any;
  cliente: Cliente;
  clienteRecebido: Cliente;
  enderecos;
  verificaCampoInput = false;

  constructor(private route: ActivatedRoute,
              private _clientService: ClienteService,
              private _fb: FormBuilder) { }

  ngOnInit() {
    this.iniciarForm();
    this.obterId();

    // this.dadosDoCliente();
  }

  iniciarForm() {
    this.dadosClienteEdicaoForm = this._fb.group({
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


  atualizar(cliente) {
    this._clientService.atualizar(cliente)
                        .subscribe(res => res);

    this.dadosClienteEdicaoForm.reset();
  }

  recuperarCliente() {
    this._clientService.retornarUm(this.id).subscribe((res) => {
      this.dadosClienteEdicaoForm.get('cnpj_cpf').patchValue(res.cnpj_cpf);
      this.dadosClienteEdicaoForm.get('razao_social').patchValue(res.razao_social);
      this.dadosClienteEdicaoForm.get('inscricao_estadual').patchValue(res.inscricao_estadual);
      this.dadosClienteEdicaoForm.get('nome_fantasia').patchValue(res.nome_fantasia);
      this.clienteRecebido = res;
    });

  }

}

