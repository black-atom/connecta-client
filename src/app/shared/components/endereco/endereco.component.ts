import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { Cliente } from './../../../models';
import { CepService } from './../../services/cep-service';
import { DadosEndereco } from './../../../models';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html'
})
export class EnderecoComponent implements OnInit {

  @Input() formEndereco: FormGroup;
  @Input() desabilitaSelecionarEndereco: Boolean;
  @Input() clienteRecebido: Cliente;

  constructor(
    private _cepService: CepService,
    private _fb: FormBuilder) {}

  ngOnInit() {
  }

  buscaPorCep(cep: string) {
      if (cep.length === 8) {
        this._cepService.obterInfoEndereco(cep).subscribe((dados: DadosEndereco) => {
          this.formEndereco.get('cidade').patchValue(dados.localidade);
          this.formEndereco.get('complemento').patchValue(dados.complemento);
          this.formEndereco.get('uf').patchValue(dados.uf);
          this.formEndereco.get('rua').patchValue(dados.logradouro);
          this.formEndereco.get('bairro').patchValue(dados.bairro);
      });
  }
}
  enderecoSelecionado(endereco) {
    console.dir(endereco);
    this.formEndereco.get('cep').patchValue(endereco.cep);
    this.formEndereco.get('cidade').patchValue(endereco.cidade);
    this.formEndereco.get('complemento').patchValue(endereco.complemento);
    this.formEndereco.get('uf').patchValue(endereco.uf);
    this.formEndereco.get('rua').patchValue(endereco.rua);
    this.formEndereco.get('bairro').patchValue(endereco.bairro);
    this.formEndereco.get('numero').patchValue(endereco.numero);
    this.formEndereco.get('ponto_referencia').patchValue(endereco.ponto_referencia);
}

}
