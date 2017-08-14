import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { formPrincipaisControls } from './principais-informacoes/';
import { formEnderecoControls } from './endereco/';

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

   constructor(private _cepService: CepService,
               private _fb: FormBuilder,
               private _tecnicoService: TecnicoService) {}

   ngOnInit() {
        this.formTecnico = this._fb.group({
          dados: this._fb.group(formPrincipaisControls),

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
     console.log(tecnico)
    //  tecnico.value.createdAt = this.data;

    //  this._tecnicoService.novoTecnico(tecnico.value)
    //                      .subscribe(res => res);
   }

   limpar() {
     this.formTecnico.reset();
   }


}
