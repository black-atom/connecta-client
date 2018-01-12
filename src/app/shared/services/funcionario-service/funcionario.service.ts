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

  retornarTodos(): Observable<Funcionario[]> {
    return this._http.get(`${environment.API_ENDPOINT}/api/funcionarios`)
                     .map((res) => res.json() as Funcionario[] )
                     .catch(ManipuladorErro.lidaComErro);
  }

  retornarFuncionarioPorFuncao(funcao): Observable<Funcionario[]> {
    return this.retornarTodos().map(funcionarios => {
      return funcionarios.filter(funcionario => funcionario.login.tipo.indexOf(funcao) > -1);
    });
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

  funcionariosLazyLoad(skip: number = 0, limit: number = 25, searchAll = {}): Observable <any> {
    return this._http.get(`${environment.API_ENDPOINT}/api/funcionarios?skip=${skip}&limit=${limit}`, { params: { search: searchAll } })
                     .map((res) => res.json() as any[])
                     .catch(ManipuladorErro.lidaComErro);
  }
}
