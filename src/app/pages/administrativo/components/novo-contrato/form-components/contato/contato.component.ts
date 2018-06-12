import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-contato-cliente',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoClienteComponent implements OnChanges {

  @Input()
  public contatoControl;

  @Input()
  public clienteEncontrado;

  public contatoEscolhido;

  constructor() { }

  ngOnChanges(changes) {
    const contato = changes.clienteEncontrado;
    if (!contato) {
      this.contatoEscolhido = { };
    }
  }

  contatoSelecionado(contato) {
    this.contatoControl.get('contato.nome').patchValue(contato.nome);
    this.contatoControl.get('contato.telefone').patchValue(contato.telefone);
    this.contatoControl.get('contato.celular').patchValue(contato.celular);
    this.contatoControl.get('contato.email').patchValue(contato.email);
    this.contatoControl.get('contato.observacao').patchValue(contato.observacao);
  }

  mascaraTelefone(rawValue: string) {
    if (rawValue === undefined) {
      rawValue = '';
    }
    const value = rawValue.replace(/\D+/g, '');
    if (value.length > 10) {
      return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    } else {
      return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    }
  }
}

