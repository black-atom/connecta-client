import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { formContatoControls } from './form-contato-controls';

@Component({
  selector: 'app-contato-cliente',
  templateUrl: './contato.component.html'
})
export class ContatoComponent implements OnInit {

  formContato: FormGroup;

  constructor(
    private _fb: FormBuilder) { }

  ngOnInit() {
    this.formContato = this._fb.group(formContatoControls);
    }
  }
