import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotificationsService } from 'angular2-notifications';
import { DadosEndereco } from './../../../../models';
import { CepService } from './../../../../shared/services';
import { TecnicoService } from './../../../../shared/services';
import { Tecnico } from './../../../../models';

@Component({
  selector: 'app-novo-tecnico',
  templateUrl: './novo-tecnico.component.html',
  styleUrls: ['./novo-tecnico.component.scss']
})
export class NovoTecnicoComponent implements OnInit {

  public formTecnico: FormGroup;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

   constructor(private _fb: FormBuilder,
               private _tecnicoService: TecnicoService,
               private _notificacaoService: NotificationsService) {}

   ngOnInit() {
    this.formTecnico = this._fb.group({
      nome: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      data_nasc: ['', [Validators.required]],
      email: ['', [Validators.pattern(this.emailPattern)]],
      telefone: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      observacao: [''],
      cnh: ['', [Validators.required]],
      validade_carteira: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      rua: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      complemento: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      ponto_referencia: [''],
      createdAt: [''],
      updatedAt: ['']
    });
   }

   cadastrarTecnico(tecnico: Tecnico) {
    this._tecnicoService.novoTecnico(tecnico)
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
    this.formTecnico.reset();
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

