import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AtendimentoServiceService } from './../../../../shared/services/atendimento-service/atendimento-service.service';

@Component({
  selector: 'app-novo-atendimento',
  templateUrl: './novo-atendimento.component.html',
  styleUrls: ['./novo-atendimento.scss']
})
export class NovoAtendimentoComponent implements OnInit {

  formAtendimento: FormGroup;
   data = new Date();
  // tslint:disable-next-line:max-line-length
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private _fb: FormBuilder,
              private _atendimentoServiceService: AtendimentoServiceService) { }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.formAtendimento = this._fb.group({
      razao_social: ['', Validators.required],
      cnpj_cpf: ['', [Validators.required]],
      email: ['', [Validators.pattern(this.emailPattern)]],
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
  cadastrarAtendimento(dados) {
    console.log(dados);
    this._atendimentoServiceService.novoAtendimento(dados)
                                   .subscribe(res => alert(res.razao_social));
  }
}
