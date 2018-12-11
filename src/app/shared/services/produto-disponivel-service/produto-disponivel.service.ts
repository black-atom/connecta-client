import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';

import { ManipuladorErro } from './../';
import { AuthHttp } from 'angular2-jwt';

import { environment } from 'environments/environment';


@Injectable()
export class ProdutoDisponivelService {

  constructor(private _http: AuthHttp) { }

  getProdutosAvailables(skip = 0, limit = 0, query = {}) {
    return this._http.get(`${environment.API_ENDPOINT}/api/produtos-disponiveis?skip=${skip}&limit=${limit}`, { params: { search: query } })
      .map(res => res.json() as any)
      .catch(ManipuladorErro.lidaComErro);
  }

  getProdutoByID(id) {
    return this._http.get(`${environment.API_ENDPOINT}/api/produtos-disponiveis/${id}`)
      .map(res => res.json() as any)
      .catch(ManipuladorErro.lidaComErro);
  }

  updateProductAvailable(id, body ) {
    return this._http
    .put(`${environment.API_ENDPOINT}/api/produtos-disponiveis/${id}`, { ...body })
      .map(res => res.json())
      .catch(ManipuladorErro.lidaComErro);
  }
}
