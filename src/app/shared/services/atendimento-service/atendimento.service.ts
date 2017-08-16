import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Atendimento } from './../../../models';

@Injectable()
export class AtendimentoService {

  private url = ' http://localhost:3000/atendimentos';

  constructor(private _http: Http) { }

  novo(atendimento) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.post(this.url, atendimento, options)
                     .map((res) => res.json() as Atendimento)
                     .catch((error: any) => Observable
                     .throw(error.json().error || 'Ocorreu um erro'));
  }

}
