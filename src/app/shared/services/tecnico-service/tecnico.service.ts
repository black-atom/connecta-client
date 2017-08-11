import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TecnicoModel } from './../../../models/tecnico/tecnico.interface';

@Injectable()
export class TecnicoService {

private api = ' http://localhost:3000';

  constructor( private _http: Http) { }

  retornarUm(idTecnico: Number): Observable<TecnicoModel> {
    const url = `${this.api}/tecnicos/${idTecnico}`;
     return this._http.get(url).map((res) => res.json() );
  }

   retornarTodos(): Observable<TecnicoModel[]> {
    const url = `${this.api}/tecnicos/`;
    return this._http.get(url).map((res) => res.json() as TecnicoModel[] );
  }

  novoTecnico(novo) {
    const url = `${this.api}/tecnicos/`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    this._http.post(url, novo, options).map((res) => res.json() as TecnicoModel);
  }
}
