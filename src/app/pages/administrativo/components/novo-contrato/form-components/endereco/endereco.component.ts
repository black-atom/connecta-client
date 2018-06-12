import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-endereco-cliente',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoClienteComponent implements OnChanges {

  @Input()
  public enderecoControl: FormGroup;

  @Input()
  public clienteEncontrado;

  public mascaraCep = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public enderecoEscolhido;

  ngOnChanges(changes) {
    const endereco = changes.enderecoEscolhido;
    if (!endereco) {
      this.enderecoEscolhido = { };
    }
  }

  enderecoSelecionado(endereco) {
    this.enderecoControl.get('endereco.complemento').patchValue(endereco.complemento);
    this.enderecoControl.get('endereco.uf').patchValue(endereco.uf);
    this.enderecoControl.get('endereco.rua').patchValue(endereco.rua);
    this.enderecoControl.get('endereco.bairro').patchValue(endereco.bairro);
    this.enderecoControl.get('endereco.cep').patchValue(endereco.cep);
    this.enderecoControl.get('endereco.cidade').patchValue(endereco.cidade);
    this.enderecoControl.get('endereco.numero').patchValue(endereco.numero);
    this.enderecoControl.get('endereco.ponto_referencia').patchValue(endereco.ponto_referencia);
  }

}
