import { Component, OnInit, Input } from '@angular/core';

import { Contrato, EquipamentoContrato, Proposta } from 'app/models';

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
    const propostas = this.contrato.propostas;
    const propostaAtiva = propostas.filter(proposta => proposta.ativo) as Proposta[];
    propostaAtiva.map(res => this.equipamentos = res.equipamentos);
  }

  filterEquipamentosByCnpj(cnpj: string) {
    const equips = [];
    this.equipamentos.filter(equip => equip.cnpjCliente === cnpj ? equips.push(equip) : '');
    return equips;
  }

  calcTotalEquipamentos(cnpj: string) {
    const equipamentos = this.filterEquipamentosByCnpj(cnpj);
    return equipamentos.reduce((total, equipamento) => {
      return total + equipamento.valor;
    }, 0);
  }

}
