import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-endereco-cliente',
  templateUrl: './endereco.component.html'
})
export class EnderecoClienteComponent {

  @Input()
  public enderecoControl;

  @Input()
  public clienteEncontrado;

  public enderecoEscolhido;

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
