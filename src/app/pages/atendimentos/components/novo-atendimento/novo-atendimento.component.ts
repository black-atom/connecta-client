import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { Atendimento } from './../../../../models';
import { AtendimentoService, ClienteService } from './../../../../shared/services';
import { NotificacaoService } from './../../../../shared/services/notificacao-service';

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
              private _notificacaoService: NotificacaoService,
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

      contato: this._fb.group({
        email: ['', [Validators.pattern(this.emailPattern)]],
        nome: ['', Validators.required],
        telefone: ['', [Validators.required]],
        celular: ['', [Validators.required]],
        observacao: ['']
      }),

      endereco: this._fb.group({
        cep: ['', [Validators.required]],
        rua: ['', [Validators.required]],
        bairro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        complemento: [''],
        uf: ['', [Validators.required]],
        ponto_referencia: ['']
      }),

      data_atendimento: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      valor: [''],
      modelo_equipamento: ['', [Validators.required]],
      numero_equipamento: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      testes_efetuados: ['', [Validators.required]],
      observacao: [''],
      estacionamento: ['', Validators.required],

      createAt: [''],
      updatedAt: ['']
    });
  }

  buscarCliente(cnpj) {
    if (cnpj) {
      this._clienteService.buscarCliente(cnpj)
      .subscribe((res) => {
        if (res) {
           const cliente = res[0];
         if (cliente !== undefined ) {
          this.formAtendimento.get('razao_social').patchValue(cliente.razao_social);
          this.formAtendimento.get('inscricao_estadual').patchValue(cliente.inscricao_estadual);
          this.formAtendimento.get('nome_fantasia').patchValue(cliente.nome_fantasia);
          this.clienteEncontrado = cliente;
         }else {
           this.falhaAoEncontrarCliente();
           this.formAtendimento.reset();
         }
        }
      }
    );
  }
}

  contatoSelecionado(contato) {
    this.formAtendimento.get('contato.nome').patchValue(contato.nome);
    this.formAtendimento.get('contato.telefone').patchValue(contato.telefone);
    this.formAtendimento.get('contato.celular').patchValue(contato.celular);
    this.formAtendimento.get('contato.email').patchValue(contato.email);
    this.formAtendimento.get('contato.observacao').patchValue(contato.observacao);
  }

  enderecoSelecionado(endereco) {
    this.formAtendimento.get('endereco.complemento').patchValue(endereco.complemento);
    this.formAtendimento.get('endereco.uf').patchValue(endereco.uf);
    this.formAtendimento.get('endereco.rua').patchValue(endereco.rua);
    this.formAtendimento.get('endereco.bairro').patchValue(endereco.bairro);
    this.formAtendimento.get('endereco.cep').patchValue(endereco.cep);
    this.formAtendimento.get('endereco.cidade').patchValue(endereco.cidade);
    this.formAtendimento.get('endereco.numero').patchValue(endereco.numero);
    this.formAtendimento.get('endereco.ponto_referencia').patchValue(endereco.ponto_referencia);
  }


  cadastrarAtendimento(atendimento: Atendimento) {
    const dataFormAtendimento = new Date(atendimento.data_atendimento);
    const dataAtual = new Date();

      atendimento.cnpj_cpf = atendimento.cnpj_cpf.replace(/\D+/g, '');
      atendimento.inscricao_estadual = atendimento.inscricao_estadual.replace(/\D+/g, '');
      atendimento.contato.celular = atendimento.contato.celular.replace(/\D+/g, '');
      atendimento.contato.telefone = atendimento.contato.telefone.replace(/\D+/g, '');
      atendimento.endereco.cep = atendimento.endereco.cep.replace(/\D+/g, '');

    if ( dataFormAtendimento.getDate() + 1 >= dataAtual.getDate()
      && dataFormAtendimento.getMonth() >= dataAtual.getMonth()
      && dataFormAtendimento.getFullYear() >= dataAtual.getFullYear()) {

        this._atendimentoServiceService.novoAtendimento(atendimento).subscribe(
          dados => {},
          erro => {
              this.falhaNoCadastro();
          },
          () => {
              this.sucessoNoCadastro();
          }
        );
      } else {
        this.falhaDataMenorQueAtual();
      }
  }


  sucessoNoCadastro() {
    this._notificacaoService.notificarSucesso(
      'Cadastro efetuado com sucesso!',
      ''
    );
    this.formAtendimento.reset();
  }

  falhaNoCadastro() {
    this._notificacaoService.notificarErro(
      'Não foi possível efetuar o cadastro',
      ''
    );
  }

  falhaAoEncontrarCliente() {
    this._notificacaoService.notificarAviso(
      'Cliente não encontrado!',
      ''
    );
  }

  falhaDataMenorQueAtual() {
    this._notificacaoService.notificarErro(
      'Data informada inferior a data atual',
      ''
    );
  }
}
