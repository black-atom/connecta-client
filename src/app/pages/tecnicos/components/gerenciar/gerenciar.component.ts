import { Component, OnInit } from '@angular/core';

import { TECNICOSMOCK } from './../../../../utils/mocks/tecnicos.mock';
import { TecnicoModel } from './../../../../models/tecnico/tecnico.interface';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./gerenciar.component.scss']
})
export class GerenciarComponent implements OnInit {

  tecnicos: TecnicoModel[] = TECNICOSMOCK;

  constructor() { }

  ngOnInit() {
  }

}
