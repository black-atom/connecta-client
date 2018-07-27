import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contato-cliente',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoClienteComponent implements OnInit {

  @Input()
  public contatoControl;

  constructor() { }

  ngOnInit() { }

  mascaraTelefone(rawValue: string) {
    if (rawValue === undefined) {
      rawValue = '';
    }
    const value = rawValue.replace(/\D+/g, '');
    if (value.length > 10) {
      return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    } else {
      return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    }
  }
}

