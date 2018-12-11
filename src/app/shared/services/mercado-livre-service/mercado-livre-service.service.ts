import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';

import { ManipuladorErro } from './..';

@Injectable()
export class MercadoLivreServiceService {

  constructor(private _http: AuthHttp) { }

  createOrderSell(orderSell) {
    return this._http
    .post(`${environment.API_ENDPOINT}/api/mercado-livre`, orderSell)
    .map(res => res.json())
    .catch(ManipuladorErro.lidaComErro);
  }

  getAllMercadoLivre(skip = 0, limit = 0, query = {}) {
    return this._http
      .get(`${environment.API_ENDPOINT}/api/mercado-livre?skip=${skip}&limit=${limit}`, { params: { search: query } })
        .map(res => res.json())
        .catch(ManipuladorErro.lidaComErro);
  }

  getMercadoLivreByID(id) {
    return this._http.get(`${environment.API_ENDPOINT}/api/mercado-livre/${id}`)
      .map(res => res.json() as any)
      .catch(ManipuladorErro.lidaComErro);
  }

}
