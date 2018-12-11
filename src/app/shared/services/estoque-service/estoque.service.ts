import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';

import { ManipuladorErro } from './..';


@Injectable()
export class EstoqueService {

  constructor(private _http: AuthHttp) { }

  getAllTransactionsStock(skip = 0, limit = 0, query = {}) {
    return this._http
      .get(`${environment.API_ENDPOINT}/api/estoque?skip=${skip}&limit=${limit}`, { params: { search: query } })
        .map(res => res.json())
        .catch(ManipuladorErro.lidaComErro);
  }

  getAllTransactionStockByIDOrder(originID) {
    return this._http
      .get(`${environment.API_ENDPOINT}/api/estoque/${originID}`)
        .map(res => res.json())
        .catch(ManipuladorErro.lidaComErro);
  }


  postTransactionsStock(products) {
    return this._http
      .post(`${environment.API_ENDPOINT}/api/estoque`, products)
        .map(res => res.json())
        .catch(ManipuladorErro.lidaComErro);
  }


}
