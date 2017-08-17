import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html'
})
export class ContatoComponent implements OnInit {

  @Input() formContato: FormGroup;
  @Input() desabilitaCampo: Boolean;
  
  constructor(
    private _fb: FormBuilder) { }

  ngOnInit() {
    }
  }
