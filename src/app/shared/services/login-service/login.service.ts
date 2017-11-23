import { ManipuladorErro } from './../app-manipulador-erro';
import { LoginState } from '../../../pages/login/redux/login.reducer';
import { Observable } from 'rxjs/Rx';
import { LoginData } from './../../../models/login-data.interface';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

import { environment } from 'environments/environment';

@Injectable()
export class LoginService {

  constructor(
    private http: Http
  ) { }

  logar(loginData: LoginData ): Observable<LoginState> {
    return this.http.post(`${environment.API_ENDPOINT}/login`, loginData)
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
