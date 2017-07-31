import { Component, OnInit } from '@angular/core';

import { TecnicoModel } from '../../../../models/tecnico/tecnico.interface';
import { TECNICOSMOCK } from './../../../../utils/mocks/tecnicos.mock';

@Component({
  selector: 'app-associar',
  templateUrl: './associar.component.html',
  styleUrls: ['./associar.component.scss']
})

export class AssociarComponent implements OnInit {


  tecnicos: TecnicoModel[] = TECNICOSMOCK;

  constructor() {}

  ngOnInit() {}


}
