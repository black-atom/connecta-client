import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { Cliente } from './../../../models';
import { ManipuladorErro } from './../';


@Injectable()
export class ClienteService {

  private url: string = 'http://localhost:3000/clientes/';


  constructor(private _http: Http) { }

  retornarTodos(cnpjCpf?: any): Observable <Cliente[]> {

    return this._http.get(this.url, { params: { cnpj_cpf: cnpjCpf } })
                     .map(res => res.json() as Cliente[])
                     .catch(ManipuladorErro.lidaComErro);
  }

  retornarUm(id): Observable <Cliente> {
    return this._http.get(`${this.url}${id}`)
                     .map(res => res.json() as Cliente)
                     .catch(ManipuladorErro.lidaComErro);
  }

  novoCliente(cliente: Cliente): Observable <Cliente> {
    const headers = new Headers({ 'Content-Type' : 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.post(this.url, cliente, options)
                     .map(res => res.json() as Cliente)
                     .catch(ManipuladorErro.lidaComErro);
  }

  atualizarCliente(cliente): Observable <Cliente> {
    const headers = new Headers({ 'Content-Type' : 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.put(`${this.url}${cliente.id}/`, cliente, options)
                     .map(res => res.json() as Cliente)
                     .catch(ManipuladorErro.lidaComErro);
  }
}
