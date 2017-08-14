import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Cliente } from './../../../models/cliente/cliente.interface';


@Injectable()
export class ClienteService {

  private url: string = 'http://localhost:3000';

  constructor(private _http: Http) { }

  retornarTodos(): Observable<Cliente[]> {
    return this._http
      .get(`${this.url}/clientes/`)
      .map(res => res.json() as Cliente[]);
  }

  // cadastrarCliente(cliente: Cliente): Observable<Cliente> {
  //   return this._http
  //   .post(`${this.url}`, `${cliente}`)
  //   .map(res => res.json() as Cliente);
  // }
}
