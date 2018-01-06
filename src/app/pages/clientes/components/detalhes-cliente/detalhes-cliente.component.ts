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
import { IFormCanDeactivate } from './../../../../shared/guards/form-candeactivate.interface';
import { removeMaskFromProp } from 'app/shared/utils/StringUtils';

@Component({
  selector: 'app-detalhes-cliente',
  templateUrl: './detalhes-cliente.component.html',
  styleUrls: ['./detalhes-cliente.component.scss']
})
export class DetalhesClienteComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  private subscription: Subscription;
  private cliente: Cliente;
  public formDetalhesCliente: FormGroup;
  private id: string;
  public dadosClienteCadastrado: Cliente;

  get contatos(): FormArray { return this.formDetalhesCliente.get('contatos') as FormArray; }
  get enderecos(): FormArray { return this.formDetalhesCliente.get('enderecos') as FormArray; }

  constructor(private _activatedRoute: ActivatedRoute,
              private _clienteService: ClienteService,
              private _fb: FormBuilder,
              private _notificacaoService: NotificacaoService,
              private _router: Router) { }

  ngOnInit() {
    this.formulario();
    this.obterIdCliente();
  }

  obterIdCliente() {
    this.subscription = this._activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.recuperarCliente();
  });
}

  formulario() {
    this.formDetalhesCliente = this._fb.group({
      cnpj_cpf: ['', [Validators.required]],
      nome_razao_social: ['', [Validators.required]],
      inscricao_estadual: [''],
      nome_fantasia: [''],
      contatos: this._fb.array([]),
      enderecos: this._fb.array([])
  });
  }

  recuperarCliente() {
    this.subscription = this._clienteService.retornarUm(this.id).subscribe((res) => {
      this.formDetalhesCliente.get('cnpj_cpf').patchValue(res.cnpj_cpf);
      this.formDetalhesCliente.get('nome_razao_social').patchValue(res.nome_razao_social);
      this.formDetalhesCliente.get('inscricao_estadual').patchValue(res.inscricao_estadual);
      this.formDetalhesCliente.get('nome_fantasia').patchValue(res.nome_fantasia);
      /**
       *  Add the number of necessary contacts according to the number of contacts that comes
       *  from the server
      */
      res.contatos.forEach( () => this.adicionarContato() );
      this.formDetalhesCliente.controls['contatos'].patchValue(res.contatos);

      res.enderecos.forEach( () => this.adicionarEndereco() );
      this.formDetalhesCliente.controls['enderecos'].patchValue(res.enderecos);
      this.dadosClienteCadastrado = res;
    });
  }


  replaceFieldsCliente(cliente: Cliente) {

    const dadosClienteFormatado = {
      cnpj_cpf: removeMaskFromProp('cnpj_cpf')(cliente),
      inscricao_estadual: removeMaskFromProp('inscricao_estadual')(cliente)
    };

    const contatos = cliente.contatos.map(contato => {
      const telefonesFormatado = {
        telefone: removeMaskFromProp('telefone')(contato),
        celular: removeMaskFromProp('celular')(contato)
      };
      return { ...contato, ...telefonesFormatado };
    });

    const enderecos = cliente.enderecos.map(endereco => {
      const cepFormatado = {
        cep: removeMaskFromProp('cep')(endereco)
      };
      return { ...endereco, ...cepFormatado };
    });

    return { ...cliente, ...dadosClienteFormatado, contatos, enderecos };
  }


  atualizarCliente(cliente) {
    const clienteFormatado = this.replaceFieldsCliente(cliente);
    clienteFormatado._id = this.id;

    this.subscription = this._clienteService.atualizarCliente(clienteFormatado)
    .subscribe(dados => {},
      erro =>
      this.notificarFalha(),
      () =>
      this.notificarSucesso()
    );
  }

  removerContato(index) {
    this.contatos.removeAt(index);
  }

  removerEndereco(index) {
    this.enderecos.removeAt(index);
  }

  adicionarContato() {
    const contatos: FormArray = <FormArray> this.formDetalhesCliente.get('contatos');
    contatos.push(this._fb.group(formContatoControls));
  }

  adicionarEndereco() {
    const enderecos: FormArray = <FormArray> this.formDetalhesCliente.get('enderecos');
    enderecos.push(this._fb.group(formEnderecoControls));
  }

  podeDesativar() {
    if(this.formDetalhesCliente.touched) {
      if( confirm('Deseja sair da página? Todos os dados serão perdidos!')) {
        return true;
      } else {
        return false;
        }
    }
      return true;
  }

  notificarSucesso() {
    this._notificacaoService.notificarSucesso(
      'Edição efetuada com sucesso!',
      ''
    );
  }

  notificarFalha() {
    this._notificacaoService.notificarErro(
      'Não foi possível efetuar a edição',
      ''
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
