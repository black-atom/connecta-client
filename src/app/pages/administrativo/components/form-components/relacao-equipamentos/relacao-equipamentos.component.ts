import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Cliente } from 'app/models';

@Component({
  selector: 'app-relacao-equipamentos',
  templateUrl: './relacao-equipamentos.component.html',
  styleUrls: ['./relacao-equipamentos.component.scss']
})
export class RelacaoEquipamentosComponent {

  @Input()
  contrato: FormGroup;

  @Input()
  formProposta: FormGroup;

  @Input()
  valorTotal: number;

  @Input()
  indexProposta: number;

  @Input()
  qtdEquipamentos: number;

  @Output()
  editEquipamento = new EventEmitter();

  @Output()
  removeEquipamento = new EventEmitter();

  constructor() { }

  retirarEquipamento(indexEquipamento: number): void {
    const indexProposta = this.indexProposta;
    this.removeEquipamento.emit({ indexEquipamento, indexProposta });
  }

  editarEquipamento(equipamento, index: number): void {
    this.editEquipamento.emit({ equipamento, index });
  }

  filterTodosClientes(): Cliente[] {
    const cnpjAssociados = this.contrato.get('cnpjAssociados').value;
    const cliente = this.contrato.get('cliente').value;
    return [cliente, ...cnpjAssociados];
  }

  returnRazaoSocial(cnpj: string): string {
    const clientesDoContrato: Cliente[] = this.filterTodosClientes();
    const nomeCliente = clientesDoContrato.filter(cliente => cliente.cnpj_cpf === cnpj)[0];
    return nomeCliente.nome_razao_social;
  }

}
