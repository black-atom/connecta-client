import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { NotificationsService } from 'angular2-notifications';
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

  public formEdicaoCliente: FormGroup;
  private id: string;
  private sub: any;
  private cliente: Cliente;
  public desabilita = false;
  public clienteRecebidoAtendimento: Cliente;

  constructor(private _activatedRoute: ActivatedRoute,
              private _clientService: ClienteService,
              private _fb: FormBuilder,
              private _notificacaoService: NotificationsService,
              private _router: Router) { }

  ngOnInit() {
    this.iniciarForm();
    this.obterIdCliente();
  }

  obterIdCliente() {
    this.sub = this._activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.recuperarCliente();
  });
}

  iniciarForm() {
    this.formEdicaoCliente = this._fb.group({
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

  recuperarCliente() {
    this._clientService.retornarUm(this.id).subscribe((res) => {
      this.formEdicaoCliente.get('cnpj_cpf').patchValue(res.cnpj_cpf);
      this.formEdicaoCliente.get('razao_social').patchValue(res.razao_social);
      this.formEdicaoCliente.get('inscricao_estadual').patchValue(res.inscricao_estadual);
      this.formEdicaoCliente.get('nome_fantasia').patchValue(res.nome_fantasia);
      this.clienteRecebidoAtendimento = res;
    });
  }

  atualizarCliente(cliente) {
    cliente.value.updatedAt = new Date();
    cliente.value.id = this.clienteRecebidoAtendimento.id;
    cliente.value.createdAt = this.clienteRecebidoAtendimento.createdAt;

    this._clientService.atualizarCliente(cliente)
    .subscribe(dados => {
    },
    erro => {
      this.falhaNaEdicao();
    },
    () => {
      this.sucessoNaEdicao();
    });
  }


  sucessoNaEdicao() {
    this._notificacaoService.success(
      'Edição efetuada com sucesso!',
      '',
      {
        timeOut: 1000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
      }
    );
    this.formEdicaoCliente.reset();
    this.irParaGerenciar();
  }

  falhaNaEdicao() {
    this._notificacaoService.error(
      'Não foi possível efetuar a edição',
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

  irParaGerenciar() {
    setTimeout(() => {
      this._router.navigate(['/pages/tecnicos/gerenciar']);
    }, 1500);
  }

}



