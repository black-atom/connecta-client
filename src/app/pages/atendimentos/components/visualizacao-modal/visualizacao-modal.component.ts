import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Atendimento } from './../../../../models/atendimento.interface';

@Component({
  selector: 'app-visualizacao-modal',
  templateUrl: './visualizacao-modal.component.html',
  styleUrls: ['./visualizacao-modal.component.scss']
})
export class VisualizacaoModalComponent implements OnInit {

@Input()
atendimentoSelecionado: Atendimento;


public tabActived = 'atendimento';

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
