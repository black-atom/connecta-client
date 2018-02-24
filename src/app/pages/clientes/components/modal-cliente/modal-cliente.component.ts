import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../../../../models/';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.scss']
})

export class ModalClienteComponent implements OnInit {

  @Input() clienteSelecionado: Cliente;

  constructor(public modalAtiva: NgbActiveModal) { }

  ngOnInit() {
  }

  fecharModal() {
    this.modalAtiva.close();
  }

}
