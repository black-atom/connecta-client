import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-principais-informacoes',
  templateUrl: './principais-informacoes.component.html',
  styleUrls: ['./principais-informacoes.component.scss']
})
export class PrincipaisInformacoesComponent implements OnInit {

  @Input() formDadosPrincipais: FormGroup;
  
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    }
}
