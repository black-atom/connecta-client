import { NotificationsService } from 'angular2-notifications';

import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AtendimentoService } from './../../../../shared/services';
import { CepService } from '../../../../shared/services/cep-service';
import { Atendimento } from './../../../../models/atendimento.interface';
import { DadosEndereco } from './../../../../models/dados-endereco.interface';

@Component({
  selector: 'app-detalhes-atendimento',
  templateUrl: './detalhes-atendimento.component.html',
  styleUrls: ['./detalhes-atendimento.component.scss']
})
export class DetalhesAtendimentoComponent implements OnInit {

  public formEdicaoAtendimento: FormGroup;
  private id: Number;
  private atendimentoRecebido: Atendimento;
  public contatoEscolhido;
  public enderecoEscolhido;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  
  
  constructor(private _atendimentoService: AtendimentoService,
             private _activatedRoute: ActivatedRoute,
             private _cepService: CepService,
             private _fb: FormBuilder,
             private _router: Router,
             private _notificacaoService: NotificationsService
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

   buscaPorCep(cep: string) {
    this._cepService.obterInfoEndereco(cep).subscribe((dados: DadosEndereco) => {
        this.formEdicaoAtendimento.get('rua').patchValue(dados.logradouro);
        this.formEdicaoAtendimento.get('bairro').patchValue(dados.bairro);
        this.formEdicaoAtendimento.get('cidade').patchValue(dados.localidade);
        this.formEdicaoAtendimento.get('uf').patchValue(dados.uf);
    });
  }

  recuperarAtendimento() {
    this._atendimentoService.retornarUm(this.id).subscribe((res) => {
      this.formEdicaoAtendimento.get('razao_social').patchValue(res.razao_social);
      this.formEdicaoAtendimento.get('cnpj_cpf').patchValue(res.cnpj_cpf);
      this.formEdicaoAtendimento.get('inscricao_estadual').patchValue(res.inscricao_estadual);
      this.formEdicaoAtendimento.get('nome_fantasia').patchValue(res.nome_fantasia);
      this.formEdicaoAtendimento.get('email').patchValue(res.email);
      this.formEdicaoAtendimento.get('nome').patchValue(res.nome);
      this.formEdicaoAtendimento.get('telefone').patchValue(res.telefone);
      this.formEdicaoAtendimento.get('celular').patchValue(res.celular);
      this.formEdicaoAtendimento.get('observacao').patchValue(res.observacao);
      this.formEdicaoAtendimento.get('cep').patchValue(res.cep);
      this.formEdicaoAtendimento.get('rua').patchValue(res.rua);
      this.formEdicaoAtendimento.get('bairro').patchValue(res.bairro);
      this.formEdicaoAtendimento.get('numero').patchValue(res.numero);
      this.formEdicaoAtendimento.get('cidade').patchValue(res.cidade);
      this.formEdicaoAtendimento.get('uf').patchValue(res.uf);
      this.formEdicaoAtendimento.get('complemento').patchValue(res.complemento);
      this.formEdicaoAtendimento.get('ponto_referencia').patchValue(res.ponto_referencia);
      this.formEdicaoAtendimento.get('data_atendimento').patchValue(res.cidade);
      this.formEdicaoAtendimento.get('tipo_atendimento').patchValue(res.tipo_atendimento);
      this.formEdicaoAtendimento.get('descricao_atendimento').patchValue(res.descricao_atendimento);

      this.atendimentoRecebido = res;
    });
  }

  contatoSelecionado(contato) {
    this.formEdicaoAtendimento.get('nome').patchValue(contato.nome);
    this.formEdicaoAtendimento.get('telefone').patchValue(contato.telefone);
    this.formEdicaoAtendimento.get('celular').patchValue(contato.celular);
    this.formEdicaoAtendimento.get('email').patchValue(contato.email);
    this.formEdicaoAtendimento.get('observacao').patchValue(contato.observacao);
  }

  enderecoSelecionado(endereco) {
    this.formEdicaoAtendimento.get('complemento').patchValue(endereco.complemento);
    this.formEdicaoAtendimento.get('uf').patchValue(endereco.uf);
    this.formEdicaoAtendimento.get('rua').patchValue(endereco.rua);
    this.formEdicaoAtendimento.get('bairro').patchValue(endereco.bairro);
    this.formEdicaoAtendimento.get('cep').patchValue(endereco.cep);
    this.formEdicaoAtendimento.get('cidade').patchValue(endereco.cidade);
    this.formEdicaoAtendimento.get('numero').patchValue(endereco.numero);
    this.formEdicaoAtendimento.get('ponto_referencia').patchValue(endereco.ponto_referencia);
  }
   atualizarAtendimento(tecnico) {
    tecnico.value.updatedAt = new Date();
    tecnico.value.id = this.id;
    tecnico.value.createdAt = this.atendimentoRecebido.id;

    this._atendimentoService.atualizarAtendimento(tecnico.value)
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
  this.formEdicaoAtendimento.reset();
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
      this._router.navigate(['/pages/atendimentos/gerenciar']);
    }, 1500);
  }

}
