import { Component, OnInit } from '@angular/core';

import { TecnicoModel } from '../../../../models/tecnico/tecnico.interface';
import { TECNICOSMOCK } from './../../../../utils/mocks/tecnicos.mock';

import { AtendimentoModel } from './../../../../models/atendimento/atendimento.interface';
import { ATENDIMENTOSMOCK } from './../../../../utils/mocks/atendimentos.mock';

@Component({
  selector: 'app-associar',
  templateUrl: './associar.component.html',
  styleUrls: ['./associar.component.scss']
})

export class AssociarComponent implements OnInit {


  tecnicos: TecnicoModel[] = TECNICOSMOCK;
  atendimentos: AtendimentoModel[] = ATENDIMENTOSMOCK;

  constructor() {}

  ngOnInit() {}


}
