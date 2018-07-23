import { Component, OnInit, Input } from '@angular/core';

import { Proposta, Contrato } from 'app/models';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})

export class HistoricoComponent implements OnInit {

  @Input()
  public contrato: Contrato;

  @Input()
  public propostas: Proposta[];

  constructor() { }

  ngOnInit() { }

  totalEquipamentos(proposta) {
    const isEncerrado = equipamento => equipamento.encerradoEm !== null ? 0 : 1;
    const equipamentos = proposta.equipamentos;
    return equipamentos.reduce((total, equipamento) => {
      return total + isEncerrado(equipamento);
    }, 0);
  }

}
