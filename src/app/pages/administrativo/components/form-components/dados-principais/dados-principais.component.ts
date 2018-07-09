import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dados-principais-cliente',
  templateUrl: './dados-principais.component.html',
  styleUrls: ['./dados-principais.component.scss']
})
export class DadosPrincipaisClienteComponent implements OnInit {

  @Input()
  public parentForm: FormGroup;

  @Output()
  buscarCliente = new EventEmitter();

  @Output()
  buscarClienteEhVincular = new EventEmitter();

  @Output()
  sendCnpjAssociado = new EventEmitter();

  @Output()
  removeCnpjAssociado = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  vincularCnpj() {
    this.sendCnpjAssociado.emit();
  }

  removerCnpj(cnpj) {
    this.removeCnpjAssociado.emit(cnpj);
  }

  pesquisarCliente(cnpj) {
    this.buscarCliente.emit(cnpj);
  }

  pesquisarClienteEhVincular(index, cnpj) {
    this.buscarClienteEhVincular.emit({ cnpj, index });
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
