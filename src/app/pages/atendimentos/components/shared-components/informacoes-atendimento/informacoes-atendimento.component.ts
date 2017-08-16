import { Component, OnInit, Input } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { TIPOATENDIMENTOMOCK } from './../../../../../utils/mocks';

@Component({
  selector: 'app-informacoes-atendimento',
  templateUrl: './informacoes-atendimento.component.html',
  styleUrls: ['./informacoes-atendimento.component.scss']
})
export class InformacoesAtendimentoComponent implements OnInit {

  tipoAtendimento = TIPOATENDIMENTOMOCK;
  @Input() formDescricaoAtendimento: FormGroup;
  
  constructor() { }

  ngOnInit() {
  }

}
