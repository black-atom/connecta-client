import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { Atendimento } from './../../../../models';
import { NotificationsService } from 'angular2-notifications';
import { AtendimentoService, ClienteService } from './../../../../shared/services';

@Component({
  selector: 'app-novo-atendimento',
  templateUrl: './novo-atendimento.component.html',
  styleUrls: ['./novo-atendimento.scss']
})
export class NovoAtendimentoComponent implements OnInit {

  public clienteEncontrado;
  public contatoEscolhido;
  public enderecoEscolhido;
  public formAtendimento: FormGroup;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private _fb: FormBuilder,
              private _atendimentoServiceService: AtendimentoService,
              private _notificacaoService: NotificationsService,
              private _clienteService: ClienteService) { }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.formAtendimento = this._fb.group({
      razao_social: ['', Validators.required],
      cnpj_cpf: ['', [Validators.required]],
      inscricao_estadual: [''],
      nome_fantasia: [''],
      email: ['', [Validators.pattern(this.emailPattern)]],
      nome: ['', Validators.required],
      telefone: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      observacao: [''],
      cep: ['', [Validators.required]],
      rua: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      complemento: [''],
      uf: ['', [Validators.required]],
      ponto_referencia: [''],
      data_atendimento: ['', [Validators.required]],
      tipo_atendimento: ['', [Validators.required]],
      decricao_atendimento: ['', [Validators.required]],
      createAt: [''],
      updatedAt: ['']
    });
  }

  buscarCliente(cnpj) {
    if (cnpj) {
      this._clienteService.buscarCliente(cnpj)
      .subscribe((res) => {
        const cliente = res[0];
        this.formAtendimento.get('razao_social').patchValue(cliente.razao_social);
        this.formAtendimento.get('inscricao_estadual').patchValue(cliente.inscricao_estadual);
        this.formAtendimento.get('nome_fantasia').patchValue(cliente.nome_fantasia);
        this.clienteEncontrado = cliente;
      });
    }
  }

  contatoSelecionado(contato) {
    this.formAtendimento.get('nome').patchValue(contato.nome);
    this.formAtendimento.get('telefone').patchValue(contato.telefone);
    this.formAtendimento.get('celular').patchValue(contato.celular);
    this.formAtendimento.get('email').patchValue(contato.email);
    this.formAtendimento.get('observacao').patchValue(contato.observacao);
  }

  enderecoSelecionado(endereco) {
    this.formAtendimento.get('complemento').patchValue(endereco.complemento);
    this.formAtendimento.get('uf').patchValue(endereco.uf);
    this.formAtendimento.get('rua').patchValue(endereco.rua);
    this.formAtendimento.get('bairro').patchValue(endereco.bairro);
    this.formAtendimento.get('cep').patchValue(endereco.cep);
    this.formAtendimento.get('cidade').patchValue(endereco.cidade);
    this.formAtendimento.get('numero').patchValue(endereco.numero);
    this.formAtendimento.get('ponto_referencia').patchValue(endereco.ponto_referencia);
  }


  cadastrarAtendimento(atendimento: Atendimento) {
    this._atendimentoServiceService.novoAtendimento(atendimento)
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
    this.formAtendimento.reset();
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
