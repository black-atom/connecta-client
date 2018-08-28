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
  public expandedRowIndex = '';

  public messages = [];

  constructor() { }

  ngOnInit() {
    this.filterPropostaAtiva();
  }

  filterPropostaAtiva() {
    const { propostas } = this.contrato;
    const getPropostaAtiva = (proposta: Proposta) => Boolean(proposta.ativo);
    const propostaAtiva = propostas.find(getPropostaAtiva);

    this.equipamentos = propostaAtiva.equipamentos;
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
