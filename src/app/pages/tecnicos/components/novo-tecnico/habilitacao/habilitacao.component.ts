import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-habilitacao',
  templateUrl: './habilitacao.component.html',
  styleUrls: ['./habilitacao.component.scss']
})
export class HabilitacaoComponent implements OnInit {

  @Input() formHabilitacao: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
  }

}
