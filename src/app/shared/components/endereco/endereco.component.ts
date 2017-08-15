import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { CepService } from './../../services/cep-service/cep.service';
import { AddressInfo } from './../../../models/addressInfo';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html'
})
export class EnderecoComponent implements OnInit {

  @Input() formEndereco: FormGroup;
 
  constructor(
    private _cepService: CepService, 
    private _fb: FormBuilder) {}

  ngOnInit() {
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
