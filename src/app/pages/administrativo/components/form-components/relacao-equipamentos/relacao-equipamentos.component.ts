import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Cliente } from 'app/models';
import { ModalEdicaoComponent } from '../modal-edicao/modal-edicao.component';

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

  @Input()
  isNovoContrato: boolean;

  @Output()
  editEquipamento = new EventEmitter();

  @Output()
  removeEquipamento = new EventEmitter();

  constructor(
    private modalService: NgbModal
  ) { }

  retirarEquipamento(equipamento, index: number): void {
    const indexProposta = this.indexProposta;
    this.removeEquipamento.emit({ equipamento, indexProposta, index });
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

  openModalEdicao(equipamento, index) {
    if (!this.isNovoContrato) {
      const referenciaModal = this.modalService.open(
        ModalEdicaoComponent
      );
      referenciaModal.componentInstance.equipamento = equipamento;
      referenciaModal.componentInstance.showEncerradoEm = true;
      referenciaModal.result.then(resultadoDaModal => {
        if (resultadoDaModal) {
          this.retirarEquipamento(resultadoDaModal, index);
        }
      }).catch(error => error);
    }
    this.retirarEquipamento(equipamento, index);
  }

}
