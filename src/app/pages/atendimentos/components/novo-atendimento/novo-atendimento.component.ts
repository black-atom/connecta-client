import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Atendimento } from './../../../../models';
import { AtendimentoService, ClienteService } from './../../../../shared/services';
import { NotificacaoService } from './../../../../shared/services/notificacao-service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

import { TIPOATENDIMENTOMOCK } from '../../../../utils/mocks';

@Component({
  selector: 'app-novo-atendimento',
  templateUrl: './novo-atendimento.component.html',
  styleUrls: ['./novo-atendimento.component.scss']
})

export class NovoAtendimentoComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  public clienteEncontrado;
  public contatoEscolhido;
  public enderecoEscolhido;
  public formAtendimento: FormGroup;
  public novoAtendimentoEditarCampos: Boolean = true;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private _fb: FormBuilder,
              private _atendimentoServiceService: AtendimentoService,
              private _notificacaoService: NotificacaoService,
              private _clienteService: ClienteService,
              private _ngbDateParserFormatter: NgbDateParserFormatter) { }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.formAtendimento = this._fb.group({
      cliente: this._fb.group({
        nome_razao_social: ['', Validators.required],
        cnpj_cpf: ['', [Validators.required]],
        inscricao_estadual: [''],
        nome_fantasia: ['']

      }),

      contato: this._fb.group({
        email: ['', [Validators.pattern(this.emailPattern)]],
        nome: ['', Validators.required],
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
      numero_equipamento: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      testes_efetuados: ['', [Validators.required]],
      observacao: [''],
      estacionamento: ['', Validators.required]
    });
  }

  buscarCliente(cnpj) {
    if (cnpj) {
     this.sub = this._clienteService.retornarUm(cnpj)
      .subscribe((res) => {
          if (res) {
          this.formAtendimento.get('cliente.nome_razao_social').patchValue(res.nome_razao_social);
          this.formAtendimento.get('cliente.inscricao_estadual').patchValue(res.inscricao_estadual);
          this.formAtendimento.get('cliente.nome_fantasia').patchValue(res.nome_fantasia);
          this.clienteEncontrado = res;
          } else {
            this.falhaAoEncontrarCliente();
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

    const dataFormulario = this.formAtendimento.controls['data_atendimento'].value;
    const dataAtendimento = new Date(dataFormulario.year, dataFormulario.month - 1, dataFormulario.day );
    const dataAtual = new Date();

      atendimento.cliente.cnpj_cpf = atendimento.cliente.cnpj_cpf.replace(/\D+/g, '');
      atendimento.cliente.inscricao_estadual = atendimento.cliente.inscricao_estadual.replace(/\D+/g, '');
      atendimento.contato.celular = atendimento.contato.celular.replace(/\D+/g, '');
      atendimento.contato.telefone = atendimento.contato.telefone.replace(/\D+/g, '');
      atendimento.endereco.cep = atendimento.endereco.cep.replace(/\D+/g, '');

    if ( dataAtendimento.getDate() >= dataAtual.getDate()
      && dataAtendimento.getMonth() >= dataAtual.getMonth()
      && dataAtendimento.getFullYear() >= dataAtual.getFullYear()) {

        atendimento.data_atendimento = dataAtendimento;

        this.sub = this._atendimentoServiceService.novoAtendimento(atendimento).subscribe(
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

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
