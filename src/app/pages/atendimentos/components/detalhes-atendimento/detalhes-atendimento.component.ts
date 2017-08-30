import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { AtendimentoService } from './../../../../shared/services';
import { CepService } from '../../../../shared/services';
import { Atendimento } from './../../../../models';
import { DadosEndereco } from './../../../../models';
import { NotificacaoService } from './../../../../shared/services/notificacao-service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

@Component({
  selector: 'app-detalhes-atendimento',
  templateUrl: './detalhes-atendimento.component.html',
  styleUrls: ['./detalhes-atendimento.component.scss']
})
export class DetalhesAtendimentoComponent implements OnInit, OnDestroy {

  public formEdicaoAtendimento: FormGroup;
  private sub: Subscription;
  private id: any;
  private atendimentoRecebido: any;
  public contatoEscolhido: any;
  public enderecoEscolhido: any;
  public detalhesAtendimentoEditarCampos = true;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


  constructor(private _atendimentoService: AtendimentoService,
              private _activatedRoute: ActivatedRoute,
              private _cepService: CepService,
              private _fb: FormBuilder,
              private _router: Router,
              private _notificacaoService: NotificacaoService,
              private _ngbDateParserFormatter: NgbDateParserFormatter
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.obterIdAtendimento();
  }

  obterIdAtendimento() {
    this._activatedRoute.params.subscribe(params => this.id = +params['id']);
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
      this.formEdicaoAtendimento.get('data_atendimento').patchValue(res.data_atendimento);
      this.formEdicaoAtendimento.get('tipo').patchValue(res.tipo);
      this.formEdicaoAtendimento.get('descricao').patchValue(res.descricao);
      this.formEdicaoAtendimento.get('testes_efetuados').patchValue(res.testes_efetuados);
      this.formEdicaoAtendimento.get('valor').patchValue(res.valor);
      this.formEdicaoAtendimento.get('modelo_equipamento').patchValue(res.modelo_equipamento);
      this.formEdicaoAtendimento.get('numero_equipamento').patchValue(res.numero_equipamento);
      this.formEdicaoAtendimento.get('estacionamento').patchValue(res.estacionamento);
      this.formEdicaoAtendimento.get('observacao').patchValue(res.observacao);
      this.atendimentoRecebido = res;
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
   atualizarAtendimento(atendimento) {
    atendimento.id = this.id;

    const dataFormulario = this.formEdicaoAtendimento.controls['data_atendimento'].value;
    const dataFormatada = this._ngbDateParserFormatter.format(dataFormulario);
    const dataAtendimento = new Date(dataFormatada);
    const dataAtual = new Date();

    atendimento.cnpj_cpf = atendimento.cnpj_cpf.replace(/\D+/g, '');
    atendimento.inscricao_estadual = atendimento.inscricao_estadual.replace(/\D+/g, '');
    atendimento.contato.celular = atendimento.contato.celular.replace(/\D+/g, '');
    atendimento.contato.telefone = atendimento.contato.telefone.replace(/\D+/g, '');
    atendimento.endereco.cep = atendimento.endereco.cep.replace(/\D+/g, '');

    if ( dataAtendimento.getDate() + 1 >= dataAtual.getDate()
      && dataAtendimento.getMonth() >= dataAtual.getMonth()
      && dataAtendimento.getFullYear() >= dataAtual.getFullYear()) {

        atendimento.data_atendimento = dataFormatada;

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

  sucessoNaEdicao() {
  this._notificacaoService.notificarSucesso(
    'Edição efetuada com sucesso!',
    ''
  );
  this.formEdicaoAtendimento.reset();
  this.irParaGerenciar();
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

  irParaGerenciar() {
    setTimeout(() => {
      this._router.navigate(['/pages/atendimentos/gerenciar']);
    }, 1500);
  }

  ngOnDestroy() {
    if (this.sub) {
    this.sub.unsubscribe();
    }
  }
}
