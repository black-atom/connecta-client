import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { Cliente } from './../../../models/cliente/cliente.interface';


@Injectable()
export class ClienteService {

  private url: string = 'http://localhost:3000';


  constructor(private _http: Http) { }

  retornarTodos(cnpjCpf?: any ): Observable <Cliente[]> {
    return this._http
      .get(`${this.url}/clientes/`, { params: { cnpj_cpf: cnpjCpf } })
      .map(res => res.json() as Cliente[]);
  }

  retornarUm(id): Observable <Cliente> {
    return this._http
      .get(`${this.url}/clientes/${id}`)
      .map(res => res.json() as Cliente);
  }

  cadastrarCliente(cliente: Cliente): Observable <Cliente> {
    const headers = new Headers({ 'Content-Type' : 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http
    .post(`${this.url}/clientes/`, cliente, options)
    .map(res => res.json() as Cliente);
  }

  atualizar(cliente): Observable <Cliente> {
    const headers = new Headers({ 'Content-Type' : 'application/json' });
    const options = new RequestOptions({ headers });
  
    return this._http
    .put(`${this.url}/clientes/${cliente.id}`, cliente, options)
    .map(res => res.json() as Cliente);
  }
}
