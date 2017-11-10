import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { EnderecoViaCep } from './../../../models';
import { ManipuladorErro } from './../';


@Injectable()
export class CepService {
  private url = 'http://viacep.com.br/ws';

  constructor(private http: Http) { }

  obterInfoEndereco(cep: string): Observable<EnderecoViaCep> {

    const url = `${this.url}/${this.removerCaracteresEspeciais(cep)}/json`;
    return this.http.get(url)
                    .map((response) => response
                    .json() as EnderecoViaCep)
                    .catch(ManipuladorErro.lidaComErro);

  }

  /**
   * Check whether cep is valid or not
   * @param cep the cep that will be checked
   */
  isValid(cep: string): boolean {

    const cepClean = this.removerCaracteresEspeciais(cep);
    const validacep = new RegExp(/^[0-9]{8}$/);

    return validacep.test(cepClean);

  }

  private removerCaracteresEspeciais (cep: string): string {
    return cep.replace(/\D/g, '');
  }
}
