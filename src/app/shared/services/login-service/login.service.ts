import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { DadosLogin } from './../../../models';
import { ManipuladorErro } from './../app-manipulador-erro';
import { LoginState } from '../../../pages/login/redux/login.reducer';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class LoginService {

  url = 'http://165.227.78.113:3000/login';

  constructor(
    private http: Http
  ) { }

  logar(dadosLogin: DadosLogin ): Observable<LoginState> {
    return this.http.post(this.url, dadosLogin)
    .map( response => response.json() as LoginState)
    .catch(ManipuladorErro.lidaComErro);
  }

  estaLogado(): boolean {
    return tokenNotExpired();
  }


  logout(): void {
    localStorage.removeItem('token');
  }

}
