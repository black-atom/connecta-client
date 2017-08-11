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

  formEndereco: FormGroup;
  
   constructor(private _cepService: CepService, private _fb: FormBuilder) {}
 
   ngOnInit() {
     this.formEndereco = this._fb.group({
       cep: ['', [Validators.required]],
        rua: ['', [Validators.required]],
        bairro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        complemento: ['', [Validators.required]],
        uf: ['', [Validators.required]],
     });
   }
 
   buscaPorCep(cep: string) {
     this._cepService.obterInfoEndereco(cep).subscribe((data: AddressInfo) => {
         this.formEndereco.get('cidade').patchValue(data.localidade);
         this.formEndereco.get('complemento').patchValue(data.complemento);
         this.formEndereco.get('uf').patchValue(data.uf);
         this.formEndereco.get('rua').patchValue(data.logradouro);
         this.formEndereco.get('bairro').patchValue(data.bairro);
     });
  }
}
