import { Component, OnInit, Input } from '@angular/core';

import { AtendimentoModel } from './../../../../../models/atendimento/atendimento.interface';
import { ATENDIMENTOSMOCK } from './../../../../../utils/mocks/atendimentos.mock';

@Component({
  selector: 'app-atendimentos-disponiveis',
  templateUrl: './atendimentos-disponiveis.component.html',
  styleUrls: ['./atendimentos-disponiveis.component.scss']
})
export class AtendimentosDisponiveisComponent implements OnInit {

  atendimentos: AtendimentoModel[] = ATENDIMENTOSMOCK;

  constructor() { }

  ngOnInit() {
  }

}
