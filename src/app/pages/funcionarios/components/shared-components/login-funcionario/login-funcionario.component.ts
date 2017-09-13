import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TIPOFUNCIONARIOMOCK } from './../../../../../utils/mocks/';


@Component({
  selector: 'app-login-funcionario',
  templateUrl: './login-funcionario.component.html',
  styleUrls: ['./login-funcionario.component.scss']
})
export class LoginFuncionarioComponent implements OnInit {

  @Input()
  formLoginFuncionario: FormGroup;

  @Input()
  disabled: boolean;

  @Output()
  tipoSelecionado = new EventEmitter();

  tipoFuncionario = TIPOFUNCIONARIOMOCK;

  state: boolean;
  value: string;

  constructor() { }

  ngOnInit() {
  }

  permissao(tipo, value) {
      this.tipoSelecionado.emit(tipo);
  }
}
