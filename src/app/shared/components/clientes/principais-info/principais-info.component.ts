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

  @Input() formDadosPrincipais: FormGroup;

  constructor(private _fb: FormBuilder,
              private _clienteService: ClienteService) { }

  ngOnInit() {
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
