import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { ClienteService } from './../../../../shared/services/cliente-service';
import { Cliente } from './../../../../models/cliente.interface';
import { formEnderecoControls } from './../../../../shared/components/endereco';
import { formContatoControls } from './../../../../shared/components/contato';
import { NotificationsService } from 'angular2-notifications';

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
  public dadosClienteCadastrado: Cliente;

  get contatos(): FormArray { return this.formEdicaoCliente.get('contatos') as FormArray; }
  get enderecos(): FormArray { return this.formEdicaoCliente.get('enderecos') as FormArray; }

  constructor(private _activatedRoute: ActivatedRoute,
              private _clientService: ClienteService,
              private _fb: FormBuilder,
              private _notificacaoService: NotificationsService,
              private _router: Router) { }

  ngOnInit() {
    this.iniciarForm();
    this.obterIdCliente();
    this.adicionarContato();
    this.adicionarEndereco();
  }

  obterIdCliente() {
    this.sub = this._activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.recuperarCliente();
  });
}

  iniciarForm() {
    this.formEdicaoCliente = this._fb.group({
      cnpj_cpf: ['', [Validators.required]],
      razao_social: ['', [Validators.required]],
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
      this.formEdicaoCliente.controls['contatos'].patchValue(res.contatos);
      this.formEdicaoCliente.controls['enderecos'].patchValue(res.enderecos);
      this.dadosClienteCadastrado = res;
    });
  }

  atualizarCliente(cliente) {
      cliente.value.updatedAt = new Date();
      cliente.value.id = this.id;

      this._clientService.atualizarCliente(cliente.value)
      .subscribe(dados => {
      },
      erro => {
        this.falhaNaEdicao();
      },
      () => {
        this.sucessoNaEdicao();
      });

  }


  removerContato(index) {
    this.contatos.removeAt(index);
  }

  removerEndereco(index) {
    this.enderecos.removeAt(index);
  }

  adicionarContato() {
    const contatos: FormArray = <FormArray> this.formEdicaoCliente.get('contatos');
    contatos.push(this._fb.group(formContatoControls));
  }

  adicionarEndereco() {
    const enderecos: FormArray = <FormArray> this.formEdicaoCliente.get('enderecos');
    enderecos.push(this._fb.group(formEnderecoControls));
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
      this._router.navigate(['/pages/clientes/gerenciar']);
    }, 1500);
  }

}



