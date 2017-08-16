import { Component, OnInit } from '@angular/core';

import { TecnicoService } from './../../../../shared/services/tecnico-service';
import { TECNICOSMOCK } from './../../../../utils/mocks/tecnicos.mock';
import { Tecnico } from './../../../../models';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./gerenciar.component.scss']
})
export class GerenciarComponent implements OnInit {

  tecnicos: Tecnico[];
  tecnicoSelecionado;
  
  constructor(private _tecnicoService: TecnicoService) {}

  ngOnInit() {
    this._tecnicoService
      .retornarTodos()
      .subscribe(resultadoTecnico => (this.tecnicos = resultadoTecnico));
  }

}
