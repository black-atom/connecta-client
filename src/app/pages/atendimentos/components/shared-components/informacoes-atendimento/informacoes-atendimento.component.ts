import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { TIPOATENDIMENTOMOCK } from './../../../../../utils/mocks';
import { TIPOESTACIONAMENTO } from '../../../../../utils/mocks';

@Component({
  selector: 'app-informacoes-atendimento',
  templateUrl: './informacoes-atendimento.component.html',
  styleUrls: ['./informacoes-atendimento.component.scss']
})
export class InformacoesAtendimentoComponent implements OnInit {

  tipoAtendimento = TIPOATENDIMENTOMOCK;
  tipoEstacionamento = TIPOESTACIONAMENTO;

  @Input()
  formDescricaoAtendimento: FormGroup;

  disabledAutorizado: boolean;
  disabledValor: boolean;

  private mascaraDataAtendimento = [/\d/,/\d/,'/',/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/];

  constructor() { }

  ngOnInit() {
    this.formDescricaoAtendimento.get('tipo').valueChanges
    .subscribe((values) => {
      this.tipoAtendimentoSelecionado(values);
    });
  }

  tipoAtendimentoSelecionado(tipoAtendimento) {

    if (tipoAtendimento === TIPOATENDIMENTOMOCK[1]) {
      this.disabledAutorizado = true;
      this.disabledValor = false;
      }else if (tipoAtendimento === TIPOATENDIMENTOMOCK[11] ||
              tipoAtendimento === TIPOATENDIMENTOMOCK[12] ||
              tipoAtendimento === TIPOATENDIMENTOMOCK[13]) {
                    this.disabledAutorizado = false;
                    this.disabledValor = true;
         }else {
          this.disabledAutorizado = false;
          this.disabledValor = false;
      }
  }

}
