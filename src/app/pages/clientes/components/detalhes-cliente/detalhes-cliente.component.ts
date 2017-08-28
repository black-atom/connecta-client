import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { ClienteService } from './../../../../shared/services';
import { Cliente } from './../../../../models/cliente.interface';
import { formEnderecoControls } from './../../../../shared/components/endereco';
import { formContatoControls } from './../../../../shared/components/contato';
import { NotificationsService } from 'angular2-notifications';
import { NotificacaoService } from './../../../../shared/services/notificacao-service';

@Component({
  selector: 'app-detalhes-cliente',
  templateUrl: './detalhes-cliente.component.html',
  styleUrls: ['./detalhes-cliente.component.scss']
})
export class DetalhesClienteComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  public formEdicaoCliente: FormGroup;
  private id: string;
  private cliente: Cliente;
  public dadosClienteCadastrado: Cliente;

  get contatos(): FormArray { return this.formEdicaoCliente.get('contatos') as FormArray; }
  get enderecos(): FormArray { return this.formEdicaoCliente.get('enderecos') as FormArray; }

  constructor(private _activatedRoute: ActivatedRoute,
              private _clienteService: ClienteService,
              private _fb: FormBuilder,
              private _notificacaoService: NotificacaoService,
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
      cnpj_cpf: ['', [Validators.required]],
      razao_social: ['', [Validators.required]],
      inscricao_estadual: [''],
      nome_fantasia: [''],
      createdAt: [''],
      updatedAt: [''],
      contatos: this._fb.array([]),
      enderecos: this._fb.array([])
  });
  }

  recuperarCliente() {
    this.sub = this._clienteService.retornarUm(this.id).subscribe((res) => {
      this.formEdicaoCliente.get('cnpj_cpf').patchValue(res.cnpj_cpf);
      this.formEdicaoCliente.get('razao_social').patchValue(res.razao_social);
      this.formEdicaoCliente.get('inscricao_estadual').patchValue(res.inscricao_estadual);
      this.formEdicaoCliente.get('nome_fantasia').patchValue(res.nome_fantasia);
      /**
       *  Add the number of necessary contacts according to the number of contacts that comes
       *  from the server
      */
      res.contatos.forEach( () => this.adicionarContato() );
      this.formEdicaoCliente.controls['contatos'].patchValue(res.contatos);

      res.enderecos.forEach( () => this.adicionarEndereco() );
      this.formEdicaoCliente.controls['enderecos'].patchValue(res.enderecos);
      this.dadosClienteCadastrado = res;
    });
  }

  atualizarCliente(cliente) {
      cliente.updatedAt = new Date();
      cliente.id = this.id;

    this.sub = this._clienteService.atualizarCliente(cliente)
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
    this._notificacaoService.notificarSucesso(
      'Edição efetuada com sucesso!',
      ''
    );
    this.formEdicaoCliente.reset();
    this.irParaGerenciar();
  }

  falhaNaEdicao() {
    this._notificacaoService.notificarErro(
      'Não foi possível efetuar a edição',
      ''
    );
  }

  irParaGerenciar() {
    setTimeout(() => {
      this._router.navigate(['/pages/clientes/gerenciar']);
    }, 1500);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}



