import { environment } from 'environments/environment';
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

  getContrato(id): Observable <any> {
    return this.http.get(`${environment.API_ENDPOINT}/api/contratos/${id}`)
      .map(res => res.json() as any)
      .catch(ManipuladorErro.lidaComErro);
  }

  deleteContrato(id): Observable <any> {
    return this.http.delete(`${environment.API_ENDPOINT}/api/contratos/${id}`)
      .map(res => res.json() as any)
      .catch(ManipuladorErro.lidaComErro);
  }

  contratosLazyLoad(skip: number = 0, limit: number = 25, searchAll = {}): Observable <any> {
    return this.http.get(`${environment.API_ENDPOINT}/api/contratos?skip=${skip}&limit=${limit}`, { params: { search: searchAll } })
      .map((res) => res.json() as any)
      .catch(ManipuladorErro.lidaComErro);
  }

  atualizarContrato(contrato): Observable <any> {
    const headers = new Headers({ 'Content-Type' : 'application/json' });
    const options = new RequestOptions({ headers });

    return this.http.put(`${environment.API_ENDPOINT}/api/contratos/${contrato._id}/`, contrato, options)
                    .map(res => res.json() as any)
                    .catch(ManipuladorErro.lidaComErro);
  }

  summaryContract(tipo?: string): Observable <any> {
    let params: any = { ativo: true }

    if (tipo) {
      params = {
        ativo: true,
        tipo,
      }
    }

    return this.http.get(`${environment.API_ENDPOINT}/api/contratos/summary`, { params })
                    .map(res => res.json() as any)
                    .catch(ManipuladorErro.lidaComErro);
  }

}
