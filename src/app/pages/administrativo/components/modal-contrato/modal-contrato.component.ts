import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-contrato',
  templateUrl: './modal-contrato.component.html',
  styleUrls: ['./modal-contrato.component.scss']
})
export class ModalContratoComponent implements OnInit {

  @Input()
  contratoSelecionado: any;

  public tabActived = 'dadosCliente';
  status = ['Pago', 'Aberto', 'Pendente', 'Cancelado', 'Aguardando'];

  constructor(public modalAtiva: NgbActiveModal) { }

  ngOnInit() {
  }

  fecharModal() {
    this.modalAtiva.close();
  }
  getTab(tabSelecionada) {
    this.tabActived = tabSelecionada;
  }

}
