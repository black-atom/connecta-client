import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Cliente } from 'app/models';
import { ModalEdicaoComponent } from '../modal-edicao/modal-edicao.component';

@Component({
  selector: 'app-relacao-equipamentos',
  templateUrl: './relacao-equipamentos.component.html',
  styleUrls: ['./relacao-equipamentos.component.scss']
})
export class RelacaoEquipamentosComponent implements OnInit {

  @Input()
  contrato: FormGroup;

  @Input()
  formProposta = [];

  @Input()
  qtdEquipamentos: number;

  @Output()
  actionEquipamento = new EventEmitter();

  @Output()
  removeEquipamento = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit() { }

  returnRazaoSocial(cnpj) {
    const cnpjAssociados = this.contrato.get('cnpjAssociados').value;
    const cliente = this.contrato.get('cliente').value;
    const clientes = [cliente, ...cnpjAssociados];

    const razaoSocial = clientes.find(c => c.cnpj_cpf === cnpj)
      ? clientes.find(c => c.cnpj_cpf === cnpj).nome_razao_social
      : '';

    return razaoSocial;
  }

  actionsEquipamento = (indexEquipamento, type, equipamento = {}) =>
    this.actionEquipamento.emit({ indexEquipamento, type, equipamento })

  valueTotal = () =>
    this.formProposta.reduce((prev, { valor }) => prev + valor, 0)

  // openModalEdicao(equipamento, index) {
  //   if (!this.isNovoContrato) {
  //     const referenciaModal = this.modalService.open(
  //       ModalEdicaoComponent
  //     );
  //     referenciaModal.componentInstance.equipamento = equipamento;
  //     referenciaModal.componentInstance.showEncerradoEm = true;
  //     referenciaModal.result.then(resultadoDaModal => {
  //       if (resultadoDaModal) {
  //         this.retirarEquipamento(resultadoDaModal, index);
  //       }
  //     }).catch(error => error);
  //   }
  //   this.retirarEquipamento(equipamento, index);
  // }

}
