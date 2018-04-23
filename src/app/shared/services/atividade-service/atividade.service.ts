import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';

import { ManipuladorErro } from './..';


@Injectable()
export class AtividadeService {

  constructor(private _http: AuthHttp) {
  }

  getAllAtividades() {
    return this._http
    .get(`${environment.API_ENDPOINT}/api/monitoramentos`)
      .map(res => res.json())
      .catch(ManipuladorErro.lidaComErro);
  }
}
