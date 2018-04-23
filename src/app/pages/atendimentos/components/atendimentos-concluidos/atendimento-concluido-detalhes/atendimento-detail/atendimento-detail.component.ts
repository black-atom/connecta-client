import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-atendimento-detail',
  templateUrl: './atendimento-detail.component.html',
  styleUrls: ['./atendimento-detail.component.scss']
})
export class AtendimentoDetailComponent implements OnInit {

  @Input()
  atendimentoSelecionadoDetail;

  constructor() { }

  ngOnInit() {
  }

}
