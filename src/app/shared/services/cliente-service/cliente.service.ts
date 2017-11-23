import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { Cliente } from './../../../models';
import { ManipuladorErro } from './../';
import { AuthHttp } from 'angular2-jwt';

import { environment } from 'environments/environment';

@Injectable()
export class ClienteService {

  constructor(private _http: AuthHttp) { }

  retornarTodos(cnpjCpf?: any): Observable <Cliente[]> {

    return this._http.get(`${environment.API_ENDPOINT}/api/clientes`, { params: { cnpj_cpf: cnpjCpf } })
                     .map(res => res.json() as Cliente[])
                     .catch(ManipuladorErro.lidaComErro);
  }

  retornarUm(_id): Observable <Cliente> {
    return this._http.get(`${environment.API_ENDPOINT}/api/clientes/${_id}`)
                     .map(res => res.json() as Cliente)
                     .catch(ManipuladorErro.lidaComErro);
  }

  novoCliente(cliente: Cliente): Observable <Cliente> {
    const headers = new Headers({ 'Content-Type' : 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.post(`${environment.API_ENDPOINT}/api/clientes`, cliente, options)
                     .map(res => res.json() as Cliente)
                     .catch(ManipuladorErro.lidaComErro);
  }

  atualizarCliente(cliente): Observable <Cliente> {
    const headers = new Headers({ 'Content-Type' : 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.put(`${environment.API_ENDPOINT}/api/clientes/${cliente._id}/`, cliente, options)
                     .map(res => res.json() as Cliente)
                     .catch(ManipuladorErro.lidaComErro);
  }
}

