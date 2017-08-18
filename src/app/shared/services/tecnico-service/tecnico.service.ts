import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Tecnico } from './../../../models';
import { ManipuladorErro } from './../';

@Injectable()
export class TecnicoService {

  private url = ' http://localhost:3000/tecnicos/';

  constructor( private _http: Http) { }

  retornarTodos(): Observable<Tecnico[]> {
    return this._http.get(this.url)
                     .map((res) => res.json() as Tecnico[] )
                     .catch(ManipuladorErro.lidaComErro);
  }

  retornarUm(id: Number): Observable<Tecnico> {
    return this._http.get(`${this.url}${id}`)
                     .map((res) => res.json() )
                     .catch(ManipuladorErro.lidaComErro);
 }

  novoTecnico(tecnico: Tecnico) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.post(this.url, tecnico, options)
                     .map((res) => res.json() as Tecnico)
                     .catch(ManipuladorErro.lidaComErro);
  }

  atualizarTecnico(tecnico: Tecnico) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.put(`${this.url}${tecnico.id}/`, tecnico, options)
                     .map((res) => res.json() as Tecnico)
                     .catch(ManipuladorErro.lidaComErro);
  }
}
