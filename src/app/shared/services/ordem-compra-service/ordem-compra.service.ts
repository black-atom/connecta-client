import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';

import { ManipuladorErro } from './..';


@Injectable()
export class OrdemCompraService {

  constructor(private _http: AuthHttp) { }

  getAllOrderBuys() {
    return this._http
      .get(`${environment.API_ENDPOINT}/api/order-compras`)
        .map(res => res.json())
        .catch(ManipuladorErro.lidaComErro);
  }

  getOrderBuy(_id) {
    return this._http
    .get(`${environment.API_ENDPOINT}/api/order-compras/${_id}`)
      .map(res => res.json())
      .catch(ManipuladorErro.lidaComErro);
  }

  createOrderBuy(orderBuy) {
    return this._http
    .post(`${environment.API_ENDPOINT}/api/order-compras`, orderBuy)
      .map(res => res.json())
      .catch(ManipuladorErro.lidaComErro);
  }

  updateOrderBuy(id, reason) {
    return this._http
    .put(`${environment.API_ENDPOINT}/api/order-compras/${id}`, { reason })
      .map(res => res.json())
      .catch(ManipuladorErro.lidaComErro);
  }

  produtosLazyLoad(skip: number = 0, limit: number = 25, searchAll = {}) {
    return this._http.get(`${environment.API_ENDPOINT}/api/order-compras?skip=${skip}&limit=${limit}`, { params: { search: searchAll } })
      .map((res) => res.json())
      .catch(ManipuladorErro.lidaComErro);
  }


}
