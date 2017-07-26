import { AddressInfo } from './../../../models/addressInfo';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CepService {
  private url = 'http://viacep.com.br/ws';

  constructor(private http: Http) { }

  getAddressInfo(cep: string): Observable<AddressInfo> {

    const url = `${this.url}/${this.removeSpecialChars(cep)}/json`;
    return this.http.get(url).map((response) => response.json() as AddressInfo);

  }

  /**
   * Check whether cep is valid or not
   * @param cep the cep that will be checked
   */
  isValid(cep: string): boolean {

    const cepClean = this.removeSpecialChars(cep);
    const validacep = new RegExp(/^[0-9]{8}$/);

    return validacep.test(cepClean);

  }

  private removeSpecialChars (cep: string): string {
    return cep.replace(/\D/g, '');
  }
}
