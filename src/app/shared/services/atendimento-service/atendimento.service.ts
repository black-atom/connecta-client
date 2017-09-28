import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';


import { ManipuladorErro } from './..';
import { Atendimento, Funcionario } from './../../../models';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AtendimentoService {

  private baseUrl: string;

  atendimentos: Observable<Atendimento[]>;
  private _atendimentos: BehaviorSubject<Atendimento[]>;
  private dataStore: {
    atendimentos: Atendimento[]
  };

  funcionarios: Observable<Funcionario[]>;
  private _funcionarios: BehaviorSubject<Funcionario[]>;
  private dataStoreTec: {
    funcionarios: Funcionario[]
  };

  constructor(private _http: AuthHttp) {
    this.baseUrl  = 'http://165.227.78.113:3000';

    this.dataStore = { atendimentos: [] };
    this._atendimentos = <BehaviorSubject<Atendimento[]>>new BehaviorSubject([]);
    this.atendimentos = this._atendimentos.asObservable();

    this.dataStoreTec = { funcionarios: [] };
    this._funcionarios = <BehaviorSubject<Funcionario[]>>new BehaviorSubject([]);
    this.funcionarios = this._funcionarios.asObservable();

  }

  getAllAtendimentos() {
    this._http.get(`${this.baseUrl}/api/atendimentos`)
    .map(response => response.json())
    .subscribe(res => {
      this.dataStore.atendimentos = res;
      this._atendimentos.next(Object.assign({}, this.dataStore).atendimentos);
    }, ManipuladorErro.lidaComErro);
  }

  getAllAtendimentosPorData(data: Date) {
    this._http.get(`${this.baseUrl}/api/atendimentos`)
    .map(response => response.json())
    .subscribe(res => {
      this.dataStore.atendimentos = res.filter(atendimento => {
        const busca = atendimento.data_atendimento === data.toJSON();
        if (busca) {
          if (!atendimento.tecnico.nome) {
              return atendimento;
          }
        }
      });
      this._atendimentos.next(Object.assign({}, this.dataStore).atendimentos);
    }, ManipuladorErro.lidaComErro);
  }

  getAllAtendimentosAssociados() {
    this._http.get(`${this.baseUrl}/api/funcionarios`)
      .map(response => response.json())
      .subscribe(funcionarios => {
        funcionarios.map(funcionario => {
          this._http.get(`${this.baseUrl}/api/atendimentos`)
          .map(response => response.json())
          .subscribe(atendimentos => {
            const buscaAssociado = atendimentos.filter((atendimento) => {
              const busca = atendimento.tecnico._id === funcionario._id;
              if (busca) {
                return atendimento;
              }
            });
            funcionario.atendimentos = buscaAssociado;
            return funcionario;
          });
        });
       this.dataStoreTec.funcionarios = funcionarios;
       this._funcionarios.next(Object.assign({}, this.dataStoreTec).funcionarios);
    }, ManipuladorErro.lidaComErro);
  }

  getAllAtendimentosAssociadosData(data: Date) {
    this._http.get(`${this.baseUrl}/api/funcionarios`)
      .map(response => response.json())
      .subscribe(funcionarios => {
        funcionarios.map(funcionario => {
          this._http.get(`${this.baseUrl}/api/atendimentos`)
          .map(response => response.json())
          .subscribe(atendimentos => {
            const buscaAssociado = atendimentos.filter((atendimento) => {
              const busca = atendimento.tecnico._id === funcionario._id;
              const buscaData = atendimento.data_atendimento === data.toJSON();
              if (busca && buscaData) {
                return atendimento;
              }
            });
            funcionario.atendimentos = buscaAssociado;
            return funcionario;
          });
        });
       this.dataStoreTec.funcionarios = funcionarios;
       this._funcionarios.next(Object.assign({}, this.dataStoreTec).funcionarios);
    }, ManipuladorErro.lidaComErro);
  }

  retornarTodos(): Observable <Atendimento[]> {
    return this._http.get(`${this.baseUrl}/api/atendimentos`)
                     .map((res) => res.json() as Atendimento[])
                     .catch(ManipuladorErro.lidaComErro);
  }

  retornarUm(id): Observable <Atendimento> {
    return this._http.get(`${this.baseUrl}/api/atendimentos/${id}`)
                     .map(res => res.json() as Atendimento)
                     .catch(ManipuladorErro.lidaComErro);
  }

  retornarAtendimentoPorData(data: Date): Observable <Atendimento[]> {
    return this._http.get(this.baseUrl, { params: { data_atendimento : data.toJSON() } })
                     .map((res) => res.json() as Atendimento[])
                     .catch(ManipuladorErro.lidaComErro);
  }

  novoAtendimento(atendimento): Observable <Atendimento> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.post(`${this.baseUrl}/api/atendimentos`, atendimento, options)
                     .map((res) => res.json() as Atendimento)
                     .catch(ManipuladorErro.lidaComErro);
  }

  atualizarAtendimento(atendimento): Observable <Atendimento> {
    const headers = new Headers({ 'Content-Type' : 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.put(`${this.baseUrl}/api/atendimentos/${atendimento._id}/`, atendimento, options)
                     .map(res => res.json() as Atendimento)
                     .catch(ManipuladorErro.lidaComErro);
  }

  atualizarTodosAtendimentos(atendimentos: Atendimento[]): Observable <Atendimento[]> {
    const headers = new Headers({ 'Content-Type' : 'application/json' });
    const options = new RequestOptions({ headers });

    return this._http.patch(`${this.baseUrl}/api/atendimentos`, atendimentos)
                     .map(res => res.json() as Atendimento[])
                     .catch(ManipuladorErro.lidaComErro);
  }

}
