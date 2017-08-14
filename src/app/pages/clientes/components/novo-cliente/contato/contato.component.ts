import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-contato-cliente',
  templateUrl: './contato.component.html'
})
export class ContatoComponent implements OnInit {

  @Input() formContato: FormGroup;

  constructor(
    private _fb: FormBuilder) { }

  ngOnInit() {
    }
  }
