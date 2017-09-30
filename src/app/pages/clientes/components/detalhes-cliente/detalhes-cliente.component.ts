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
    this.sub = this._activatedRoute.params.subscribe(params => {
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
    this.sub = this._clienteService.retornarUm(this.id).subscribe((res) => {
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

  atualizarCliente(cliente) {

    cliente._id = this.id;
    cliente.cnpj_cpf = cliente.cnpj_cpf.replace(/\D+/g, '');
    if (cliente.inscricao_estadual) {
      cliente.inscricao_estadual = cliente.inscricao_estadual.replace(/\D+/g, '');
    }

    cliente.contatos = cliente.contatos.map((removerMascaraContato) => {

      if (removerMascaraContato.celular) {
        const novoContatos = {
          telefone: removerMascaraContato.telefone.replace(/\D+/g, ''),
          celular : removerMascaraContato.celular.replace(/\D+/g, '')
      };
        return (Object.assign({}, removerMascaraContato, novoContatos));
      }else {
        const novoContatos = {
          telefone: removerMascaraContato.telefone.replace(/\D+/g, ''),
          celular : ''
      };
        return (Object.assign({}, removerMascaraContato, novoContatos));
      }
      });

      cliente.enderecos = cliente.enderecos.map((removerMascaraEndereco) => {
        const novoContatos = {
            cep: removerMascaraEndereco.cep.replace(/\D+/g, '')
        };
      return (Object.assign({}, removerMascaraEndereco, novoContatos));
      });

    this.sub = this._clienteService.atualizarCliente(cliente)
      .subscribe(dados => {
      },
      erro => {
        this.notificarFalha();
      },
      () => {
        this.notificarSucesso();
      });

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


  notificarSucesso() {
    this._notificacaoService.notificarSucesso(
      'Edição efetuada com sucesso!',
      ''
    );
    this.formDetalhesCliente.reset();
  }

  notificarFalha() {
    this._notificacaoService.notificarErro(
      'Não foi possível efetuar a edição',
      ''
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
