import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';


import { ManipuladorErro } from './..';
import { environment } from 'environments/environment';

@Injectable()
export class MonitoramentoService {

  constructor(private _http: AuthHttp) { }

  getMonitoramentoPorData(data): Observable<any> {
    return this._http.get(`${environment.API_ENDPOINT}/api/monitoramentos`, { params: { ...data } })
                     .map(res => res.json())
                     .catch(ManipuladorErro.lidaComErro);
  }

}
