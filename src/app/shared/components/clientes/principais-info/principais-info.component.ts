import { formContatoControls } from './../../contato/form-contato-controls';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { ClienteService } from './../../../services/cliente-service/cliente.service';


@Component({
  selector: 'app-principais-info-cliente',
  templateUrl: './principais-info.component.html',
  styleUrls: ['./principais-info.component.scss']
})
export class PrincipaisInfoComponent implements OnInit {

  @Input()
  formDadosPrincipais: FormGroup;

  @Output()
  enviaCnpj = new EventEmitter();

  private inscricaoEstadual = [/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/];


  constructor(private _fb: FormBuilder,
              private _clienteService: ClienteService) { }

  ngOnInit() {
    this.formDadosPrincipais.valueChanges.subscribe(dados => {
      dados['cnpj_cpf'] = this.obterNumber(dados['cnpj_cpf']);
    });
    }

    obterNumber(str: string): string {
    if (str === undefined) {
      str = '';
    }
      return str.replace(/\D+/g, '');
    }

    mask(valorDaLinha: string) {
        if (valorDaLinha === undefined) {
          valorDaLinha = '';
    }

  const valor = valorDaLinha.replace(/\D+/g, '');
    if (valor.length > 11) {
      return [/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/];
  }else {
      return [/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/];
  }
  }

  emiteEventoCnpj(cnpj) {
    const removerCaracteres = this.obterNumber(cnpj);
    this.enviaCnpj.emit(removerCaracteres);
  }


  // buscarCliente(cnpj) {
  //   this._clienteService.retornarTodos(cnpj)
  //     .subscribe(
  //       dados => {
  //         const verificaCliente = dados.map((razao) => {
  //           return razao.razao_social;
  //         });
  //         alert(`O cnpj: ${cnpj} já esta cadastrado nessa razão social ${verificaCliente}`);
  //         this.formDadosPrincipais.get('cnpj_cpf').patchValue('');
  //     },
  //     erro => {
  //         console.log('ocorreu um erro');
  //     },
  //     () => {
  //       console.log('sucesso');
  //     }
  //   );
  // }
}
