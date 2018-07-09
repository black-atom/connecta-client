import { forEach } from '@angular/router/src/utils/collection';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';


import { ManipuladorErro } from './..';
import { Atendimento, Funcionario } from './../../../models';
import { AuthHttp } from 'angular2-jwt';

import { TIPOFUNCIONARIOMOCK } from './../../../utils/mocks/tipo-funcionario.mock';

import { environment } from 'environments/environment';

@Injectable()
export class AtendimentoService {

  private funcoes = TIPOFUNCIONARIOMOCK;

  constructor(private _http: AuthHttp) {
  }

  retornarUm(id): Observable <Atendimento> {
    return this._http.get(`${environment.API_ENDPOINT}/api/atendimentos/${id}`)
                     .map(res => res.json() as Atendimento)
                     .catch(ManipuladorErro.lidaComErro);
  }

  novoAtendimento(atendimento): Observable <Atendimento> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.post(`${environment.API_ENDPOINT}/api/atendimentos/`, atendimento, options)
                     .map((res) => res.json() as Atendimento)
                     .catch(ManipuladorErro.lidaComErro);
  }

  atualizarAtendimento(atendimento): Observable <Atendimento> {
    const headers = new Headers({ 'Content-Type' : 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.put(`${environment.API_ENDPOINT}/api/atendimentos/${atendimento._id}/`, atendimento, options)
                     .map(res => res.json() as Atendimento)
                     .catch(ManipuladorErro.lidaComErro);
  }

  atualizarTodosAtendimentos(atendimentos: Atendimento[]): Observable <Atendimento[]> {
    const headers = new Headers({ 'Content-Type' : 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.patch(`${environment.API_ENDPOINT}/api/atendimentos`, atendimentos)
                     .map(res => res.json() as Atendimento[])
                     .catch(ManipuladorErro.lidaComErro);
  }

  getAtendimentosPorData(query) {
    return this._http.get(`${environment.API_ENDPOINT}/api/atendimentos`, { params: { ...query } })
                     .map(res => res.json() as Atendimento[])
                     .catch(ManipuladorErro.lidaComErro);
  }

  getLatestAtendimento(cnpjCpf, days = 30) {
    return this._http.get(`${environment.API_ENDPOINT}/api/atendimentos/latest`, { params: { cnpj_cpf: cnpjCpf, days } })
                     .map(res => res.json() as Atendimento[])
                     .catch(ManipuladorErro.lidaComErro);
  }

  atendimentosLazyLoad(query): Observable <any> {
    return this._http.get(`${environment.API_ENDPOINT}/api/atendimentos`, { params: { ...query } })
                     .map((res) => res.json())
                     .catch(ManipuladorErro.lidaComErro);
  }


  atualizarAtendimentoTecnica(atendimento): Observable <Atendimento> {
    const headers = new Headers({ 'Content-Type' : 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.put(`${environment.API_ENDPOINT}/api/atendimentos-checked/${atendimento._id}/`, atendimento, options)
                     .map(res => res.json() as Atendimento)
                     .catch(ManipuladorErro.lidaComErro);
  }

  associarAtendimento(idAtendimento, tecnico) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.post(`${environment.API_ENDPOINT}/api/atendimentos-associar/${idAtendimento}`, { tecnico }, options)
                     .map((res) => res.json() as Atendimento)
                     .catch(ManipuladorErro.lidaComErro);
  }

}

