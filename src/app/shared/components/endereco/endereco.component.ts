import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { Cliente, EnderecoViaCep } from './../../../models';
import { CepService } from './../../services';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {

  @Input()
  formEndereco: FormGroup;

  private mascaraCep = [/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/];

  constructor(
    private _cepService: CepService,
    private _fb: FormBuilder) {}

  ngOnInit() {
  }

  buscaPorCep(cep: string) {
   const removeCaracteresCep = cep.replace(/\D+/g, '');
      if (removeCaracteresCep.length === 8) {
        this._cepService.obterInfoEndereco(cep).subscribe((dados: EnderecoViaCep) => {
          this.formEndereco.get('cidade').patchValue(dados.localidade);
          this.formEndereco.get('complemento').patchValue(dados.complemento);
          this.formEndereco.get('uf').patchValue(dados.uf);
          this.formEndereco.get('rua').patchValue(dados.logradouro);
          this.formEndereco.get('bairro').patchValue(dados.bairro);
        });
      }
  }
}
