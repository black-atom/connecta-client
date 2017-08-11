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

   constructor(private _cepService: CepService, private _fb: FormBuilder) {}

   ngOnInit() {
     this.formTecnico = this._fb.group({
          nome: ['', [Validators.required]],
          rg: ['', [Validators.required]],
          cpf: ['', [Validators.required]],
          data_nasc: ['', [Validators.required]],
          email: ['', [Validators.required]],
          telefone: ['', [Validators.required]],
          celular: ['', [Validators.required]],
          observacao: [''],
          cnh: ['', [Validators.required]],
          validade_carteira: ['', [Validators.required]],
          rua: ['', [Validators.required]],
          numero: ['', [Validators.required]],
          completmento: ['', [Validators.required]],
          bairro: ['', [Validators.required]],
          cidade: ['', [Validators.required]],
          estado: ['', [Validators.required]],
          cep: ['', [Validators.required]],
          createdAt: ['', [Validators.required]],
          updatedAt: ['', [Validators.required]],
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
}

