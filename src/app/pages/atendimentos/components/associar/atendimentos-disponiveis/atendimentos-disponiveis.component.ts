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
  selecionados: AtendimentoModel[] = [];
  atendimentoVinculado: AtendimentoModel[] = [];
  
  constructor() { }

  ngOnInit() {
  }

  getAtendimento(atendimento) {
    const isIgual = this.selecionados.find(elemento => elemento === atendimento);

    if (isIgual === undefined) {
      this.selecionados.push(atendimento);
    }
  }

  associarAtendimento() {
    this.atendimentoVinculado = this.selecionados.map((item) => {
      item.tecnico = 'teste';
      return item;
    });

    console.log(this.atendimentoVinculado);
  }

}
