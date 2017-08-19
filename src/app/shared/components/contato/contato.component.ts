import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from './../../../models/';


@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html'
})
export class ContatoComponent implements OnInit {

  @Input() formContato: FormGroup;
  @Input() desabilitaSelecionarContato: Boolean;
  @Input() desabilitaNome: Boolean;
  @Input() clienteRecebido: Cliente;

  constructor(
    private _fb: FormBuilder) { }

  ngOnInit() {
    }

  contatoSelecionado(contato) {
      this.formContato.get('nome').patchValue(contato.nome);
      this.formContato.get('email').patchValue(contato.email);
      this.formContato.get('telefone').patchValue(contato.telefone);
      this.formContato.get('celular').patchValue(contato.celular);
      this.formContato.get('observacao').patchValue(contato.observacao);
  }

}
