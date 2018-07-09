import { Component, Input } from '@angular/core';
import { EquipamentoContrato, Cliente } from 'app/models';

import { Contrato } from 'app/models';

@Component({
  selector: 'app-equipamentos-modal',
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.scss']
})
export class EquipamentosModalComponent {

  @Input()
  public equipamentos: EquipamentoContrato[];

  @Input()
  public contrato: Contrato;

  filterTodosClientes(): Cliente[] {
    const cnpjAssociados = this.contrato.cnpjAssociados;
    const cliente = this.contrato.cliente;
    return [cliente, ...cnpjAssociados];
  }

  returnRazaoSocial(cnpj: string): string {
    const clientesDoContrato: Cliente[] = this.filterTodosClientes();
    const nomeCliente = clientesDoContrato.filter(cliente => cliente.cnpj_cpf === cnpj)[0];
    return nomeCliente.nome_razao_social;
  }

}
