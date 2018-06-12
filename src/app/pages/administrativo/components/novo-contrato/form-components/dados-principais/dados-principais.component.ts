import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dados-principais-cliente',
  templateUrl: './dados-principais.component.html',
  styleUrls: ['./dados-principais.component.scss']
})
export class DadosPrincipaisClienteComponent {

  @Input()
  public clienteForm;

  @Output()
  buscarCliente = new EventEmitter();

  constructor() { }

  pesquisarCliente(cnpj) {
    this.buscarCliente.emit(cnpj);
  }

  mask(valorDaLinha: string) {
    if (valorDaLinha === undefined) {
      valorDaLinha = '';
    }

    const valor = valorDaLinha.replace(/\D+/g, '');
    if (valor.length > 11) {
      return [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    } else {
      return [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    }
  }

}
