import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { AddressInfo } from './../../../../../models/addressInfo';
import { CepService } from './../../../../../shared/services/cep-service/cep.service';


@Component({
  selector: 'app-endereco-cliente',
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
