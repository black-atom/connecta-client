import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DadosEndereco } from './../../../../models';
import { CepService } from './../../../../shared/services/cep-service';
import { TecnicoService } from './../../../../shared/services/tecnico-service';

@Component({
  selector: 'app-novo-tecnico',
  templateUrl: './novo-tecnico.component.html',
  styleUrls: ['./novo-tecnico.component.scss']
})
export class NovoTecnicoComponent implements OnInit {

  formTecnico: FormGroup;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


   constructor(private _fb: FormBuilder,
               private _tecnicoService: TecnicoService) {}

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
      cnh: [''],
      validade_carteira: [''],
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

   novoTecnico(tecnico) {
    tecnico.createdAt = new Date();

    this._tecnicoService.novo(tecnico)
                        .subscribe((res) => { 
                        alert(`Técnico ${res.nome} cadastrado com sucesso!`);
    });

    this.formTecnico.reset();
   }
}
