import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AtendimentoModel } from './../../../models/atendimento/atendimento.interface';

@Injectable()
export class AtendimentoServiceService {

  private api = ' http://localhost:3000';

  constructor(private _http: Http) { }

  novoAtendimento(body) {
    const bodyString = JSON.stringify(body);
    const url = `${this.api}/atendimentos/`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.post(url, body, options)
                     .map((res) => res.json() as AtendimentoModel)
                     .catch((error: any) => Observable
                     .throw(error.json().error || 'Server error'));
  }

}
