import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { getLogin } from './redux/login.reducer';
import { LoginData } from './../../models/login-data.interface';
import { LoginActions } from './redux/login.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../redux';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;

  constructor(fb: FormBuilder,
    private store: Store<AppState>,
    private _notificacaoService: NotificationsService,
    private _route: Router
  ) {
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  ngOnInit() {

    this.store.select(getLogin).subscribe( login => {
      if (login.error) {
        this.falhaNoLogin();
      }else if (login.token && login.funcionario) {
        this.loginComSucesso(login.funcionario.nome);
      }
    });

  }

  public onSubmit(values: LoginData): void {
    this.submitted = true;
    if (this.form.valid) {
      this.store.dispatch(LoginActions.login(values));
    }
  }

  loginComSucesso(nome: string) {
    this._notificacaoService.success(
      'Logado Com Sucesso',
      `Bem Vindo ${nome}`,
      {
        timeOut: 3000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 30
      }
    );
    setTimeout(() => this._route.navigate(['/pages/home']), 1000);
  }


  falhaNoLogin() {
    this._notificacaoService.error(
      'Erro',
      'Usuário ou senha incorretos!!!',
      {
        timeOut: 3000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 30
      }
    );
  }
}
