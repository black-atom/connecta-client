import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

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

  public tipoFuncionario: String[] = TIPOFUNCIONARIOMOCK;

  constructor() { }

  ngOnInit() { }

  get tipos(): FormArray { return this.formLoginFuncionario.controls.login.get('tipo') as FormArray; }

}
