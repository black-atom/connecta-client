import { ManipuladorErro } from './../app-manipulador-erro';
import { LoginState } from '../../../pages/login/redux/login.reducer';
import { Observable } from 'rxjs/Rx';
import { LoginData } from './../../../models/login-data.interface';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class LoginService {

  url = 'http://165.227.78.113:3000/login';

  constructor(
    private http: Http
  ) { }

  logar(loginData: LoginData ): Observable<LoginState> {
    return this.http.post(this.url, loginData)
    .map( response => response.json() as LoginState)
    .catch(ManipuladorErro.lidaComErro);
  }

  estaLogado(): boolean {
    return tokenNotExpired();
  }

}
