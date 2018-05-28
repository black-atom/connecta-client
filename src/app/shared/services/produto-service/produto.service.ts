import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ManipuladorErro } from './../';
import { AuthHttp } from 'angular2-jwt';

import { environment } from 'environments/environment';

@Injectable()
export class ProdutoService {

  constructor(private _http: AuthHttp) { }

  produtosLazyLoad(skip: number = 0, limit: number = 25, searchAll = {}): Observable <any> {
    return this._http.get(`${environment.API_ENDPOINT}/api/produtos?skip=${skip}&limit=${limit}`, { params: { search: searchAll } })
      .map((res) => res.json() as any[])
      .catch(ManipuladorErro.lidaComErro);
  }

}
