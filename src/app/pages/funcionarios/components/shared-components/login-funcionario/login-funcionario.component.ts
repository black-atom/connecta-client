import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// import { TIPOFUNCIONARIOMOCK } from './../../../../../utils/mocks/';


@Component({
  selector: 'app-login-funcionario',
  templateUrl: './login-funcionario.component.html',
  styleUrls: ['./login-funcionario.component.scss']
})
export class LoginFuncionarioComponent implements OnInit {

  @Input()
  formLoginFuncionario: FormGroup;
  // tipoFuncionario = TIPOFUNCIONARIOMOCK;

  constructor() { }

  ngOnInit() {
  }

}
