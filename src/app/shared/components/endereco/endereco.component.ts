import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { CepService } from './../../services/cep-service/cep.service';
import { DadosEndereco } from './../../../models';

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
    this._cepService.obterInfoEndereco(cep).subscribe((dados: DadosEndereco) => {
        this.formEndereco.get('cidade').patchValue(dados.localidade);
        this.formEndereco.get('complemento').patchValue(dados.complemento);
        this.formEndereco.get('uf').patchValue(dados.uf);
        this.formEndereco.get('rua').patchValue(dados.logradouro);
        this.formEndereco.get('bairro').patchValue(dados.bairro);
    });


  }

}
