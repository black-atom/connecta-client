import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';

import { ManipuladorErro } from './..';
import { Atendimento } from './../../../models';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class AtendimentoService {

  private url: string = ' http://localhost:3000/api/atendimentos/';

  constructor(private _http: AuthHttp) { }

  retornarTodos(): Observable <Atendimento[]> {
    return this._http.get(this.url)
                     .map((res) => res.json() as Atendimento[])
                     .catch(ManipuladorErro.lidaComErro);
  }

  retornarUm(id): Observable <Atendimento> {
    return this._http.get(`${this.url}${id}`)
                     .map(res => res.json() as Atendimento)
                     .catch(ManipuladorErro.lidaComErro);
  }

  retornarAtendimentoPorData(data: Date): Observable <Atendimento[]> {
    return this._http.get(this.url, { params: { data_atendimento : data.toJSON() } })
                     .map((res) => res.json() as Atendimento[])
                     .catch(ManipuladorErro.lidaComErro);
  }

  novoAtendimento(atendimento): Observable <Atendimento> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.post(this.url, atendimento, options)
                     .map((res) => res.json() as Atendimento)
                     .catch(ManipuladorErro.lidaComErro);
  }

  atualizarAtendimento(atendimento): Observable <Atendimento> {
    const headers = new Headers({ 'Content-Type' : 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.put(`${this.url}${atendimento._id}/`, atendimento, options)
                     .map(res => res.json() as Atendimento)
                     .catch(ManipuladorErro.lidaComErro);
  }

  atualizarTodosAtendimentos(atendimentos: Atendimento[]): Observable <Atendimento[]> {
    const headers = new Headers({ 'Content-Type' : 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.patch(this.url, atendimentos)
                     .map(res => res.json() as Atendimento[])
                     .catch(ManipuladorErro.lidaComErro);
  }

}
