import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Atendimento } from './../../../models';
import { ManipuladorErro } from './..';

@Injectable()
export class AtendimentoService {

  private url = ' http://localhost:3000/atendimentos/';

  constructor(private _http: Http) { }

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

    return this._http.put(`${this.url}${atendimento.id}/`, atendimento, options)
                     .map(res => res.json() as Atendimento)
                     .catch(ManipuladorErro.lidaComErro);
  }

}
