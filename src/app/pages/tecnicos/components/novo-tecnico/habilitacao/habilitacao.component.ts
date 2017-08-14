import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { formHabilitacaoControls } from './form-habilitacao-controls';

@Component({
  selector: 'app-habilitacao',
  templateUrl: './habilitacao.component.html',
  styleUrls: ['./habilitacao.component.scss']
})
export class HabilitacaoComponent implements OnInit {

  formHabilitacao: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.formHabilitacao = this._fb.group(formHabilitacaoControls);
  }

}
