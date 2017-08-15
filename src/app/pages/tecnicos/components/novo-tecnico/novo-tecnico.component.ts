import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AddressInfo } from './../../../../models/addressInfo';
import { CepService } from './../../../../shared/services/cep-service/cep.service';
import { TecnicoService } from './../../../../shared/services/tecnico-service/tecnico.service';

@Component({
  selector: 'app-novo-tecnico',
  templateUrl: './novo-tecnico.component.html',
  styleUrls: ['./novo-tecnico.component.scss']
})
export class NovoTecnicoComponent implements OnInit {

  formTecnico: FormGroup;
  data = new Date();
  // tslint:disable-next-line:max-line-length
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


   constructor(private _fb: FormBuilder,
               private _tecnicoService: TecnicoService) {}

   ngOnInit() {
    this.formInit();
   }

   formInit() {
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
        estado: ['', [Validators.required]],
        ponto_referencia: [''],
        createdAt: [''],
        updatedAt: ['']
    });
   }

   novoTecnico(tecnico) {
    tecnico.createdAt = this.data;

    this._tecnicoService.novoTecnico(tecnico)
                        .subscribe((res) => {
                          alert(`Técnico ${res.nome} cadastrado com sucesso!`);
                        });

    this.limpar();
   }

   limpar() {
     this.formTecnico.reset();
   }


}
