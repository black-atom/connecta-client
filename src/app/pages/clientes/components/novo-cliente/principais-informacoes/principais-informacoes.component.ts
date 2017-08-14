import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { formPrincipaisControls } from 'app/pages/clientes/components/novo-cliente/principais-informacoes/';

@Component({
  selector: 'app-principais-informacoes',
  templateUrl: './principais-informacoes.component.html',
  styleUrls: ['./principais-informacoes.component.scss']
})
export class PrincipaisInformacoesComponent implements OnInit {

  formDadosPrincipais: FormGroup;
  
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.formDadosPrincipais = this._fb.group(formPrincipaisControls);
    }
}
