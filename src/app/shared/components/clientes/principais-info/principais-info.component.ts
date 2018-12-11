import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { ClienteService } from './../../../services';
import { formContatoControls } from './../../contato/form-contato-controls';


@Component({
  selector: 'app-principais-info-cliente',
  templateUrl: './principais-info.component.html',
  styleUrls: ['./principais-info.component.scss']
})
export class PrincipaisInfoComponent implements OnInit {

  @Input()
  formDadosPrincipais: FormGroup;

  @Input()
  editarCampoFormulario: Boolean = false;

  @Output()
  enviaCnpj = new EventEmitter();

  formMudou: boolean = false;

  constructor(private _fb: FormBuilder,
              private _clienteService: ClienteService) { }

  ngOnInit() { }

  mask(valorDaLinha: string) {
        if (valorDaLinha === undefined) {
          valorDaLinha = '';
    }

  const valor = valorDaLinha.replace(/\D+/g, '');
    if (valor.length > 11) {
      return [/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/];
  }else {
      return [/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/];
  }
  }

  emiteEventoCnpj(cnpj) {
    const removerCaracteres = cnpj.replace(/\D+/g, '');
    this.enviaCnpj.emit(removerCaracteres);
  }

  onInput(input) {
    this.formMudou = true;
  }
}
