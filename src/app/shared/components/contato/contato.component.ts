import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {

  @Input() formContato: FormGroup;

  constructor(
    private _fb: FormBuilder) { }

  ngOnInit() {
    }

  mascaraTelefone(rawValue: string) {
    if ( rawValue === undefined) {
        rawValue = '';
    }
    const value = rawValue.replace(/\D+/g, '');
    if ( value.length > 10 ) {
        return ['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]
    } else {
        return ['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]
    }
  }
}
