import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss']
})
export class ModalAlertComponent implements OnInit {

  @Input()
  informacoes;

  constructor(public modalAtiva: NgbActiveModal,) { }

  ngOnInit() {
  }

  fecharModal() {
    this.modalAtiva.close(true);
  }
}
