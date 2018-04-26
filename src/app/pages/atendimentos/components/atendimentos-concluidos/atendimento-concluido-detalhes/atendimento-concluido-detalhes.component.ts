import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Atendimento } from 'app/models';

@Component({
  selector: 'app-atendimento-concluido-detalhes',
  templateUrl: './atendimento-concluido-detalhes.component.html',
  styleUrls: ['./atendimento-concluido-detalhes.component.scss']
})
export class AtendimentoConcluidoDetalhesComponent implements OnInit {

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
