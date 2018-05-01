import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';
import { Avaliacao } from '../../../models/avaliacoes';
import { ManipuladorErro } from '..';


@Injectable()
export class AvaliacoesService {
  private endpoint: string = `${environment.API_ENDPOINT}/api/avaliacoes`;

  constructor(private _http: AuthHttp) {
  }

  getAvaliacoes(): Observable<Avaliacao[]> {
    return this._http.get(this.endpoint)
      .map(res => res.json() as Avaliacao[])
      .catch(ManipuladorErro.lidaComErro);
  }
}
