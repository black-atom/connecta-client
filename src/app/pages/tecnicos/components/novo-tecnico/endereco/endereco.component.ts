import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { formEnderecoControls } from './form-endereco-controls';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {

  @Input() formEndereco: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.formEndereco = this._fb.group(formEnderecoControls);
  }

}
