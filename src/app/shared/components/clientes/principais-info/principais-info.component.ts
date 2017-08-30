import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { ClienteService } from './../../../services';
import { formContatoControls } from './../../contato/form-contato-controls';


@Component({
  selector: 'app-principais-info-cliente',
  templateUrl: './principais-info.component.html',
  styleUrls: ['./principais-info.component.scss']
})
export class PrincipaisInfoComponent implements OnInit {

  @Input()
  formDadosPrincipais: FormGroup;

  @Input()
  editarCampoFormulario: Boolean = false;

  @Output()
  enviaCnpj = new EventEmitter();

  private inscricaoEstadual = [/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/];


  constructor(private _fb: FormBuilder,
              private _clienteService: ClienteService) { }

  ngOnInit() { }

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
    const removerCaracteres = cnpj.replace(/\D+/g, '');
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
