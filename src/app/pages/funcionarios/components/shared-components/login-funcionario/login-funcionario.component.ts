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

  permissoesSelecionadas = [];

  tipoFuncionario = TIPOFUNCIONARIOMOCK;

  @Input()
  tipoEscolhido;
  @Input()
  tipoEscolhido2;

  constructor() { }

  ngOnInit() {
  }


  permissao1(tipo) {
    const index = this.permissoesSelecionadas.indexOf(tipo);
    if (index === -1) {
      this.permissoesSelecionadas.splice(0, 1, tipo);
    }

    this.tipoSelecionado.emit(this.permissoesSelecionadas);
  }

  permissao2(tipo) {
    const index = this.permissoesSelecionadas.indexOf(tipo);
    if (tipo) {
      if (index === -1 && tipo !== '') {
        this.permissoesSelecionadas.splice(1, 1, tipo);
      }
    }else {
      this.permissoesSelecionadas.splice(1, 1);
    }
    this.tipoSelecionado.emit(this.permissoesSelecionadas);
  }

}
