import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { RequestOptions, Headers } from '@angular/http';
import { ManipuladorErro } from '..';

@Injectable()
export class ContratoService {
  constructor(private http: AuthHttp) { }

  novoContrato(contrato): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this.http.post(`${environment.API_ENDPOINT}/api/contratos`, contrato, options)
      .map((res) => res.json())
      .catch(ManipuladorErro.lidaComErro);
  }

}
