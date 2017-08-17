import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { Atendimento } from './../../../../models';
import { NotificationsService } from 'angular2-notifications';
import { AtendimentoService } from './../../../../shared/services';

@Component({
  selector: 'app-novo-atendimento',
  templateUrl: './novo-atendimento.component.html',
  styleUrls: ['./novo-atendimento.scss']
})
export class NovoAtendimentoComponent implements OnInit {
  
  public formAtendimento: FormGroup;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private _fb: FormBuilder,
              private _atendimentoServiceService: AtendimentoService,
              private _notificacaoService: NotificationsService) { }

  ngOnInit() {
    this.formAtendimento = this._fb.group({
      razao_social: ['', Validators.required],
      cnpj_cpf: ['', [Validators.required]],
      inscricao_estadual: ['', [Validators.required]],
      nome_fantasia: ['', [Validators.required]],
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
      decricao_atendimento: ['', [Validators.required]],
      createAt: [''],
      updatedAt: [''],
      tecnico: this._fb.array([])

    });
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
