import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/filter';
import { Funcionario } from '../../../models/';
import { ManipuladorErro } from './../';

@Injectable()
export class FuncionarioService {

  private url: string = ' http://localhost:3000/api/funcionarios/';

  constructor( private _http: Http) { }

  retornarTodos(): Observable<Funcionario[]> {
    return this._http.get(this.url)
                     .map((res) => res.json() as Funcionario[] )
                     .catch(ManipuladorErro.lidaComErro);
  }

  retornarFuncionarioPorFuncao(funcao): Observable<Funcionario[]> {
    return this.retornarTodos().map(funcionarios => {
      return funcionarios.filter(funcionario => funcionario.login.tipo.indexOf(funcao) > -1);
    });
  }
  
  retornarUm(_id: string): Observable<Funcionario> {
    return this._http.get(`${this.url}${_id}`)
                     .map((res) => res.json() )
                     .catch(ManipuladorErro.lidaComErro);
 }

  novoFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.post(this.url, funcionario, options)
                     .map((res) => res.json() as Funcionario)
                     .catch(ManipuladorErro.lidaComErro);
  }

  atualizarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.put(`${this.url}${funcionario._id}/`, funcionario, options)
                     .map((res) => res.json() as Funcionario)
                     .catch(ManipuladorErro.lidaComErro);
  }
}
