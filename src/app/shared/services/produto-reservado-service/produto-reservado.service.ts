import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';

import { ManipuladorErro } from './../';
import { AuthHttp } from 'angular2-jwt';

import { environment } from 'environments/environment';


@Injectable()
export class ProdutoReservadoService {

  constructor(private _http: AuthHttp) { }

  postProductReserved(produto) {
    return this._http.post(`${environment.API_ENDPOINT}/api/produtos-reservados`, produto )
      .map(res => res.json() as any)
      .catch(ManipuladorErro.lidaComErro);
  }

  getProductReserved(id) {
    return this._http.get(`${environment.API_ENDPOINT}/api/produtos-reservados/${id}` )
      .map(res => res.json() as any)
      .catch(ManipuladorErro.lidaComErro);
  }

  putProductReserved(produto) {
    return this._http.put(`${environment.API_ENDPOINT}/api/produtos-reservados/${produto._id}`, produto)
      .map(res => res.json() as any)
      .catch(ManipuladorErro.lidaComErro);
  }

  getProductsReserved(query) {
    return this._http.get(`${environment.API_ENDPOINT}/api/produtos-reservados`, { params: { ...query } })
      .map(res => res.json() as any)
      .catch(ManipuladorErro.lidaComErro);
  }

}
