import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/filter';
import { Funcionario } from '../../../models/';
import { ManipuladorErro } from './../';
import { AuthHttp } from 'angular2-jwt';

import { environment } from 'environments/environment';

@Injectable()
export class FuncionarioService {

  constructor( private _http: AuthHttp) { }

  retornarFuncionarioPorFuncao(funcao): Observable <any> {
    return this._http.get(`${environment.API_ENDPOINT}/api/funcionarios`, { params: { ...funcao } })
      .map((res) => res.json())
      .catch(ManipuladorErro.lidaComErro);
  }

  retornarUm(_id: string): Observable<Funcionario> {
    return this._http.get(`${environment.API_ENDPOINT}/api/funcionarios/${_id}`)
      .map((res) => res.json() )
      .catch(ManipuladorErro.lidaComErro);
 }

  novoFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.post(`${environment.API_ENDPOINT}/api/funcionarios`, funcionario, options)
      .map((res) => res.json() as Funcionario)
      .catch(ManipuladorErro.lidaComErro);
  }

  atualizarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.put(`${environment.API_ENDPOINT}/api/funcionarios/${funcionario._id}/`, funcionario, options)
      .map((res) => res.json() as Funcionario)
      .catch(ManipuladorErro.lidaComErro);
  }

  funcionariosLazyLoad(query): Observable <any> {
    return this._http.get(`${environment.API_ENDPOINT}/api/funcionarios`, { params: { ...query } })
      .map((res) => res.json() as any[])
      .catch(ManipuladorErro.lidaComErro);
  }
}
