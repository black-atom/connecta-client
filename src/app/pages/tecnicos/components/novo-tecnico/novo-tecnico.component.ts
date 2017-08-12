import { TecnicoService } from './../../../../shared/services/tecnico-service/tecnico.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AddressInfo } from './../../../../models/addressInfo';
import { CepService } from './../../../../shared/services/cep-service/cep.service';

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

   constructor(private _cepService: CepService,
               private _fb: FormBuilder,
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
          cnh: ['', [Validators.required]],
          validade_carteira: ['', [Validators.required]],
          rua: ['', [Validators.required]],
          numero: ['', [Validators.required]],
          complemento: [''],
          bairro: ['', [Validators.required]],
          cidade: ['', [Validators.required]],
          estado: ['', [Validators.required]],
          cep: ['', [Validators.required]],
          createdAt: [''],
          updatedAt: [''],
          atendimentos: this._fb.array([])
     });
   }

   buscaPorCep(cep: string) {
     this._cepService.obterInfoEndereco(cep).subscribe((data: AddressInfo) => {
         this.formTecnico.get('rua').patchValue(data.logradouro);
         this.formTecnico.get('bairro').patchValue(data.bairro);
         this.formTecnico.get('cidade').patchValue(data.localidade);
         this.formTecnico.get('estado').patchValue(data.uf);

     });
   }

   novoTecnico(tecnico) {
     tecnico.value.createdAt = this.data;

     this._tecnicoService.novoTecnico(tecnico.value)
                         .subscribe(res => res);
   }

   limpar() {
     this.formTecnico.reset();
   }
}

