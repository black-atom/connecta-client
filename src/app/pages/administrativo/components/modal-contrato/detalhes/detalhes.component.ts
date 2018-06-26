import { Component, OnInit, Input } from '@angular/core';

import { Contrato, EquipamentoContrato, Proposta } from 'app/models/contrato.interface';

@Component({
  selector: 'app-detalhes-modal',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesContratoModalComponent implements OnInit {

  @Input()
  public contrato: Contrato;

  public equipamentos: EquipamentoContrato[];

  constructor() { }

  ngOnInit() {
    this.filterPropostaAtiva();
  }

  filterPropostaAtiva() {
    const propostaAtiva = this.contrato.propostas.filter(proposta => proposta.ativo) as Proposta[];
    this.equipamentos = propostaAtiva[0].equipamentos;
  }

}
