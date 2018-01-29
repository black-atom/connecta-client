import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Atendimento, Cliente, ContatoCliente, EnderecoCliente } from './../../../../models';
import { AtendimentoService, ClienteService } from './../../../../shared/services';
import { NotificacaoService } from './../../../../shared/services/notificacao-service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { IFormCanDeactivate } from './../../../../shared/guards/form-candeactivate.interface';

import { TIPOATENDIMENTOMOCK } from '../../../../utils/mocks';
import { removeMaskFromProp } from 'app/shared/utils/StringUtils';

@Component({
  selector: 'app-novo-atendimento',
  templateUrl: './novo-atendimento.component.html',
  styleUrls: ['./novo-atendimento.component.scss']
})

export class NovoAtendimentoComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  private subscription: Subscription;
  public clienteEncontrado: Cliente;
  public contatoEscolhido: ContatoCliente;
  public enderecoEscolhido: EnderecoCliente;
  public formAtendimento: FormGroup;
  public novoAtendimentoEditarCampos: Boolean = true;

  constructor(private _fb: FormBuilder,
              private _atendimentoServiceService: AtendimentoService,
              private _notificacaoService: NotificacaoService,
              private _clienteService: ClienteService,
              private _ngbDateParserFormatter: NgbDateParserFormatter) { }

  ngOnInit() {
    this.formulario();
  }

  formulario() {
    this.formAtendimento = this._fb.group({
      cliente: this._fb.group({
        nome_razao_social: ['', Validators.required],
        cnpj_cpf: ['', [Validators.required]],
        inscricao_estadual: [''],
        nome_fantasia: ['']

      }),
      contato: this._fb.group({
        email: ['', [Validators.required]],
        nome: [''],
        telefone: ['', [Validators.required]],
        celular: [''],
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
      autorizado: [''],
      modelo_equipamento: ['', [Validators.required]],
      numero_equipamento: [''],
      descricao: ['', [Validators.required]],
      testes_efetuados: ['', [Validators.required]],
      observacao: [''],
      estacionamento: ['', Validators.required]
    });
  }

  buscarCliente(cnpj) {
    if (cnpj) {
     this.subscription = this._clienteService.retornarUm(cnpj)
      .subscribe(res => {
          if (res) {
            this.formAtendimento.get('cliente.nome_razao_social').patchValue(res.nome_razao_social);
            this.formAtendimento.get('cliente.inscricao_estadual').patchValue(res.inscricao_estadual);
            this.formAtendimento.get('cliente.nome_fantasia').patchValue(res.nome_fantasia);
            this.clienteEncontrado = res;
          } else {
            this.notificarFalhaEncontrarCliente();
          }
      });
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

  replaceFieldsAtendimento(atendimento) {

    const novoAtendimento = {
      cliente: {
        nome_razao_social: atendimento.cliente.nome_razao_social,
        nome_fantasia: atendimento.cliente.nome_fantasia,
        cnpj_cpf: removeMaskFromProp('cnpj_cpf')(atendimento.cliente),
        inscricao_estadual: removeMaskFromProp('inscricao_estadual')(atendimento.cliente)
      },
      contato : {
        email: atendimento.contato.email,
        nome: atendimento.contato.nome,
        observacao: atendimento.contato.observacao,
        telefone: removeMaskFromProp('telefone')(atendimento.contato),
        celular: removeMaskFromProp('celular')(atendimento.contato)
      },
      endereco : {
        cep: removeMaskFromProp('cep')(atendimento.endereco),
        rua: atendimento.endereco.rua,
        bairro: atendimento.endereco.bairro,
        numero: atendimento.endereco.numero,
        cidade: atendimento.endereco.cidade,
        complemento: atendimento.endereco.complemento,
        uf: atendimento.endereco.uf,
        ponto_referencia: atendimento.endereco.ponto_referencia
      }
    };

    return { ...atendimento, ...novoAtendimento };
  }

  cadastrarAtendimento(atendimento: Atendimento) {

    const atendimentoFormatado = this.replaceFieldsAtendimento(atendimento);
    atendimentoFormatado.data_atendimento = new Date(
     atendimentoFormatado.data_atendimento.year,
     atendimentoFormatado.data_atendimento.month - 1,
     atendimentoFormatado.data_atendimento.day
    );

    atendimentoFormatado.estado = 'agendado';

    this.subscription = this._atendimentoServiceService.novoAtendimento(atendimentoFormatado).subscribe(
      () => {},
          erro => this.notificarFalhaCadastro(),
            () => this.notificarSucesso()
    );

  }

  podeDesativar() {
    if(this.formAtendimento.touched) {
      if( confirm('Deseja sair da página? Todos os dados serão perdidos!')) {
        return true;
      } else {
        return false;
        }
    }
      return true;
  }

  notificarSucesso() {
    this._notificacaoService.notificarSucesso('Cadastro efetuado com sucesso!', '');
    this.formAtendimento.reset();
  }

  notificarFalhaCadastro() {
    this._notificacaoService.notificarErro('Não foi possível efetuar o cadastro', '');
  }

  notificarFalhaEncontrarCliente() {
    this._notificacaoService.notificarAviso('Cliente não encontrado!', '');
  }

  notificarFalhaDataMenorQueAtual() {
    this._notificacaoService.notificarErro('Data informada inferior a data atual', '');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
