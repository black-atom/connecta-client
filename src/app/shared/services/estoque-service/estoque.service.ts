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

  getAllTransactionsStock() {
    return this._http
      .get(`${environment.API_ENDPOINT}/api/estoque`)
        .map(res => res.json())
        .catch(ManipuladorErro.lidaComErro);
  }

}
