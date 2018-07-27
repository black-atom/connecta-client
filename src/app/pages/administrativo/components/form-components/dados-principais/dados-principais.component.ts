import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dados-principais-cliente',
  templateUrl: './dados-principais.component.html',
  styleUrls: ['./dados-principais.component.scss']
})
export class DadosPrincipaisClienteComponent implements OnInit {

  @Input()
  parentForm: FormGroup;

  @Output()
  buscarCliente = new EventEmitter();

  @Output()
  actionsForm = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  actionFormEvent = (actionType, index = null) => {
    return this.actionsForm.emit({ actionType, index });
  }

  pesquisarCliente = (cnpj, tipo, index = null) => {
    return this.buscarCliente.emit({ cnpj: cnpj.replace(/\D+/g, ''), tipo, index });
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
