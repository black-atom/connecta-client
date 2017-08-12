import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TecnicoModel } from './../../../models/tecnico/tecnico.interface';

@Injectable()
export class TecnicoService {

private api = ' http://localhost:3000';

  constructor( private _http: Http) { }

    novoTecnico(body) {
    const bodyString = JSON.stringify(body);
    const url = `${this.api}/tecnicos/`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.post(url, body, options)
                     .map((res) => res.json() as TecnicoModel)
                     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  retornarUm(idTecnico: Number): Observable<TecnicoModel> {
    const url = `${this.api}/tecnicos/${idTecnico}`;

     return this._http.get(url)
                      .map((res) => res.json() )
                      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

   retornarTodos(): Observable<TecnicoModel[]> {
    const url = `${this.api}/tecnicos/`;

    return this._http.get(url)
                     .map((res) => res.json() as TecnicoModel[] )
                     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
