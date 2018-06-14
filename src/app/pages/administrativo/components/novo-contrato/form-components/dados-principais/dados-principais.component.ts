import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

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
  sendCnpjAssociado = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  vincularCnpj() {
    this.sendCnpjAssociado.emit();
  }

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
