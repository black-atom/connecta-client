import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Proposta, Contrato } from 'app/models';

@Component({
  selector: 'app-modal-contrato',
  templateUrl: './modal-contrato.component.html',
  styleUrls: ['./modal-contrato.component.scss']
})
export class ModalContratoComponent implements OnInit {

  @Input()
  public contratoSelecionado: Contrato;

  public propostas: Proposta[];

  public tabActived = 'detalhes';

  constructor(public modalAtiva: NgbActiveModal) { }

  ngOnInit() {
    this.filterPropostas();
  }

  fecharModal() {
    this.modalAtiva.close();
  }

  getTab(tabSelecionada) {
    this.tabActived = tabSelecionada;
  }

  filterPropostas(): void {
    const propostas = this.contratoSelecionado.propostas;
    this.propostas = propostas.reverse();
  }

}
