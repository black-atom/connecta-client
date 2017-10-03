import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { AtendimentoService } from './../../../../shared/services';
import { CepService } from '../../../../shared/services';
import { ClienteService } from '../../../../shared/services/cliente-service';

import { Atendimento } from './../../../../models';
import { DadosEndereco } from './../../../../models';
import { NotificacaoService } from './../../../../shared/services/notificacao-service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { TIPOATENDIMENTOMOCK } from './../../../../utils/mocks/tipo-atendimento.mock';


@Component({
  selector: 'app-detalhes-atendimento',
  templateUrl: './detalhes-atendimento.component.html',
  styleUrls: ['./detalhes-atendimento.component.scss']
})
export class DetalhesAtendimentoComponent implements OnInit, OnDestroy {

  public formEdicaoAtendimento: FormGroup;
  private sub: Subscription;
  private id: string;
  public atendimentoRecebido: Atendimento;
  public contatoEscolhido: any;
  public enderecoEscolhido: any;
  public detalhesAtendimentoEditarCampos = true;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  public clienteEncontrado;
  public tecnico;
  private action = ['reagendar', 'cancelar', 'encaixe'];

  constructor(private _atendimentoService: AtendimentoService,
              private _activatedRoute: ActivatedRoute,
              private _cepService: CepService,
              private _fb: FormBuilder,
              private _router: Router,
              private _notificacaoService: NotificacaoService,
              private _ngbDateParserFormatter: NgbDateParserFormatter,
              private _clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.obterIdAtendimento();
  }

  obterIdAtendimento() {
    this._activatedRoute.params.subscribe(params => this.id = params['id']);
    this.recuperarAtendimento();
  }

  iniciarFormulario() {
    this.formEdicaoAtendimento = this._fb.group({

      cliente: this._fb.group({
        nome_razao_social: ['', Validators.required],
        cnpj_cpf: ['', [Validators.required]],
        inscricao_estadual: [''],
        nome_fantasia: ['']

      }),

      contato: this._fb.group({
        email: ['', [Validators.pattern(this.emailPattern)]],
        nome: [''],
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
      situacao: this._fb.group({
        status: [''],
        motivo: ['']
      }),
      tecnico: this._fb.group({
        _id: [''],
        nome: ['']
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

   buscaPorCep(cep: string) {
    this.sub = this._cepService.obterInfoEndereco(cep).subscribe((dados: DadosEndereco) => {
        this.formEdicaoAtendimento.get('endereco.rua').patchValue(dados.logradouro);
        this.formEdicaoAtendimento.get('endereco.bairro').patchValue(dados.bairro);
        this.formEdicaoAtendimento.get('endereco.cidade').patchValue(dados.localidade);
        this.formEdicaoAtendimento.get('endereco.uf').patchValue(dados.uf);
    });
  }

  recuperarAtendimento() {

      this.sub = this._atendimentoService.retornarUm(this.id).subscribe((res) => {
      this.formEdicaoAtendimento.get('cliente.nome_razao_social').patchValue(res.cliente.nome_razao_social);
      this.formEdicaoAtendimento.get('cliente.cnpj_cpf').patchValue(res.cliente.cnpj_cpf);
      this.formEdicaoAtendimento.get('cliente.inscricao_estadual').patchValue(res.cliente.inscricao_estadual);
      this.formEdicaoAtendimento.get('cliente.nome_fantasia').patchValue(res.cliente.nome_fantasia);
      this.formEdicaoAtendimento.get('contato.email').patchValue(res.contato.email);
      this.formEdicaoAtendimento.get('contato.nome').patchValue(res.contato.nome);
      this.formEdicaoAtendimento.get('contato.telefone').patchValue(res.contato.telefone);
      this.formEdicaoAtendimento.get('contato.celular').patchValue(res.contato.celular);
      this.formEdicaoAtendimento.get('contato.observacao').patchValue(res.contato.observacao);
      this.formEdicaoAtendimento.get('endereco.cep').patchValue(res.endereco.cep);
      this.formEdicaoAtendimento.get('endereco.rua').patchValue(res.endereco.rua);
      this.formEdicaoAtendimento.get('endereco.bairro').patchValue(res.endereco.bairro);
      this.formEdicaoAtendimento.get('endereco.numero').patchValue(res.endereco.numero);
      this.formEdicaoAtendimento.get('endereco.cidade').patchValue(res.endereco.cidade);
      this.formEdicaoAtendimento.get('endereco.uf').patchValue(res.endereco.uf);
      this.formEdicaoAtendimento.get('endereco.complemento').patchValue(res.endereco.complemento);
      this.formEdicaoAtendimento.get('endereco.ponto_referencia').patchValue(res.endereco.ponto_referencia);
      this.formEdicaoAtendimento.get('tipo').patchValue(res.tipo);
      this.formEdicaoAtendimento.get('descricao').patchValue(res.descricao);
      this.formEdicaoAtendimento.get('testes_efetuados').patchValue(res.testes_efetuados);
      this.formEdicaoAtendimento.get('valor').patchValue(res.valor);
      this.formEdicaoAtendimento.get('modelo_equipamento').patchValue(res.modelo_equipamento);
      this.formEdicaoAtendimento.get('numero_equipamento').patchValue(res.numero_equipamento);
      this.formEdicaoAtendimento.get('estacionamento').patchValue(res.estacionamento);
      this.formEdicaoAtendimento.get('observacao').patchValue(res.observacao);

      const date = new Date(res.data_atendimento);
      const formatoData = { day: date.getDate(), month: date.getMonth() + 1 , year: date.getFullYear() };
      this.formEdicaoAtendimento.get('data_atendimento').patchValue(formatoData);

      this.atendimentoRecebido = res;
      this._clienteService.retornarUm(res.cliente.cnpj_cpf).subscribe((dados) => {
        this.clienteEncontrado = dados;
      });

    });
  }

  contatoSelecionado(contato) {
    this.formEdicaoAtendimento.get('contato.nome').patchValue(contato.nome);
    this.formEdicaoAtendimento.get('contato.telefone').patchValue(contato.telefone);
    this.formEdicaoAtendimento.get('contato.celular').patchValue(contato.celular);
    this.formEdicaoAtendimento.get('contato.email').patchValue(contato.email);
    this.formEdicaoAtendimento.get('contato.observacao').patchValue(contato.observacao);
  }

  enderecoSelecionado(endereco) {
    this.formEdicaoAtendimento.get('endereco.complemento').patchValue(endereco.complemento);
    this.formEdicaoAtendimento.get('endereco.uf').patchValue(endereco.uf);
    this.formEdicaoAtendimento.get('endereco.rua').patchValue(endereco.rua);
    this.formEdicaoAtendimento.get('endereco.bairro').patchValue(endereco.bairro);
    this.formEdicaoAtendimento.get('endereco.cep').patchValue(endereco.cep);
    this.formEdicaoAtendimento.get('endereco.cidade').patchValue(endereco.cidade);
    this.formEdicaoAtendimento.get('endereco.numero').patchValue(endereco.numero);
    this.formEdicaoAtendimento.get('endereco.ponto_referencia').patchValue(endereco.ponto_referencia);
  }

  tecnicoRecebido(tec) {
   this.tecnico = tec;
  }
   atualizarAtendimento(atendimento) {
    if (atendimento.situacao.status === this.action[2]) {
      atendimento._id = this.id;
      atendimento.tecnico._id = this.tecnico._id;
      atendimento.tecnico.nome = this.tecnico.nome;


      const dataFormulario = this.formEdicaoAtendimento.controls['data_atendimento'].value;
      const dataAtendimento = new Date(dataFormulario.year, dataFormulario.month - 1, dataFormulario.day );
      const dataAtual = new Date();

      atendimento.cliente.cnpj_cpf = atendimento.cliente.cnpj_cpf.replace(/\D+/g, '');
      if (atendimento.cliente.inscricao_estadual) {
        atendimento.cliente.inscricao_estadual = atendimento.cliente.inscricao_estadual.replace(/\D+/g, '');
      }
      if (atendimento.contato.celular) {
        atendimento.contato.celular = atendimento.contato.celular.replace(/\D+/g, '');
      }
      atendimento.contato.telefone = atendimento.contato.telefone.replace(/\D+/g, '');
      atendimento.endereco.cep = atendimento.endereco.cep.replace(/\D+/g, '');

      if ( dataAtendimento.getDate() >= dataAtual.getDate()
        && dataAtendimento.getMonth() >= dataAtual.getMonth()
        && dataAtendimento.getFullYear() >= dataAtual.getFullYear()) {

          atendimento.data_atendimento = dataAtendimento;

      this.sub = this._atendimentoService.atualizarAtendimento(atendimento)
      .subscribe(
        dados => {
      },
        erro => {
        this.falhaNaEdicao();
      },
        () => {
        this.sucessoNaEdicao();
      }
    );
    } else {
        this.falhaDataMenorQueAtual();
    }
    }else {
      atendimento._id = this.id;
      atendimento.tecnico._id = '';
      atendimento.tecnico.nome = '';


      const dataFormulario = this.formEdicaoAtendimento.controls['data_atendimento'].value;
      const dataAtendimento = new Date(dataFormulario.year, dataFormulario.month - 1, dataFormulario.day );
      const dataAtual = new Date();

      atendimento.cliente.cnpj_cpf = atendimento.cliente.cnpj_cpf.replace(/\D+/g, '');
      if (atendimento.cliente.inscricao_estadual) {
        atendimento.cliente.inscricao_estadual = atendimento.cliente.inscricao_estadual.replace(/\D+/g, '');
      }
      if (atendimento.contato.celular) {
        atendimento.contato.celular = atendimento.contato.celular.replace(/\D+/g, '');
      }
      atendimento.contato.telefone = atendimento.contato.telefone.replace(/\D+/g, '');
      atendimento.endereco.cep = atendimento.endereco.cep.replace(/\D+/g, '');

      if ( dataAtendimento.getDate() >= dataAtual.getDate()
        && dataAtendimento.getMonth() >= dataAtual.getMonth()
        && dataAtendimento.getFullYear() >= dataAtual.getFullYear()) {

          atendimento.data_atendimento = dataAtendimento;

      this.sub = this._atendimentoService.atualizarAtendimento(atendimento)
      .subscribe(
        dados => {
      },
        erro => {
        this.falhaNaEdicao();
      },
        () => {
        this.sucessoNaEdicao();
      }
    );
    } else {
        this.falhaDataMenorQueAtual();
    }
    }
}

  sucessoNaEdicao() {
  this._notificacaoService.notificarSucesso(
    'Edição efetuada com sucesso!',
    ''
  );
  this.formEdicaoAtendimento.reset();
}

  falhaNaEdicao() {
  this._notificacaoService.notificarErro(
    'Não foi possível efetuar a edição',
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
