import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Tecnico } from './../../../models';

@Injectable()
export class TecnicoService {
  
  private url = ' http://localhost:3000/tecnicos';

  constructor( private _http: Http) { }

  retornarTodos(): Observable<Tecnico[]> {
    return this._http.get(this.url)
                     .map((res) => res.json() as Tecnico[] )
                     .catch((error: any) => Observable
                     .throw(error.json().error || 'Server error'));
  }

  retornarUm(id: Number): Observable<Tecnico> {
    return this._http.get(`${this.url}${id}`)
                     .map((res) => res.json() )
                     .catch((error: any) => Observable
                     .throw(error.json().error || 'Ocorreu um erro'));
 }

  novo(tecnico: Tecnico) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.post(this.url, tecnico, options)
                     .map((res) => res.json() as Tecnico)
                     .catch((error: any) => Observable
                     .throw(error.json().error || 'Ocorreu um erro'));
  }

  atualizar(tecnico: Tecnico) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.put(`${this.url}${tecnico.id}/`, tecnico, options)
                     .map((res) => res.json() as Tecnico)
                     .catch((error: any) => Observable
                     .throw(error.json().error || 'Ocorreu um erro'));
  }
}
