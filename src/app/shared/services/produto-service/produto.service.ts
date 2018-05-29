import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';

import { ManipuladorErro } from './../';
import { AuthHttp } from 'angular2-jwt';

import { environment } from 'environments/environment';

import { Produto, ResponseProdutos } from './../../../models';


const headers = new Headers({ 'Content-Type' : 'application/json' });
const options = new RequestOptions({ headers });

@Injectable()
export class ProdutoService {

  constructor(private _http: AuthHttp) { }

  novoProduto(produto: Produto): Observable <Produto> {
    return this._http.post(`${environment.API_ENDPOINT}/api/produtos`, produto, options)
      .map(res => res.json() as any)
      .catch(ManipuladorErro.lidaComErro);
  }

  editarProduto(produto: Produto): Observable <Produto> {
    return this._http.put(`${environment.API_ENDPOINT}/api/produtos/${produto._id}`, produto, options)
      .map(res => res.json() as any)
      .catch(ManipuladorErro.lidaComErro);
  }

  getProduto(id): Observable <Produto> {
    return this._http.get(`${environment.API_ENDPOINT}/api/produtos/${id}`)
      .map(res => res.json() as any)
      .catch(ManipuladorErro.lidaComErro);
  }

  produtosLazyLoad(skip: number = 0, limit: number = 25, searchAll = {}): Observable <ResponseProdutos> {
    return this._http.get(`${environment.API_ENDPOINT}/api/produtos?skip=${skip}&limit=${limit}`, { params: { search: searchAll } })
      .map((res) => res.json() as ResponseProdutos)
      .catch(ManipuladorErro.lidaComErro);
  }

}
