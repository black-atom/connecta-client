import { Component, OnInit, Input } from '@angular/core';

import { Contrato, EquipamentoContrato, Proposta } from 'app/models';

class MyLabel {
  constructor(public year: number, public isCollapsed: boolean) { }
}

@Component({
  selector: 'app-detalhes-modal',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesContratoModalComponent implements OnInit {

  @Input()
  public contrato: Contrato;

  public equipamentos: EquipamentoContrato[];
  public expandedRowIndex = '';

  public messages = [];
  labels: MyLabel[];

  constructor() { }

  ngOnInit() {
    this.filterPropostaAtiva();
    for (let i = 0; i < 5; i++) {
      this.messages.push({
        firstName: `firstName-${i}`,
        lastName: `lastName-${i}`,
        empId: Math.floor(Math.random() * 1000)
      });
    }
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

  changeExpanded(id) {
    this.expandedRowIndex === id ? this.expandedRowIndex = '' : this.expandedRowIndex = id;
  }

}
