import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-habilitacao',
  templateUrl: './habilitacao.component.html',
  styleUrls: ['./habilitacao.component.scss']
})
export class HabilitacaoComponent implements OnInit {

  @Input()
  formHabilitacao: FormGroup;

  private mascaraCnhData = [/\d/,/\d/,'/',/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/];
  private mascaraCnh = [/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/];


  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
  }

}
