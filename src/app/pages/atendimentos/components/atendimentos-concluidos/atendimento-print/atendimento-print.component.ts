import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-atendimento-print',
  templateUrl: './atendimento-print.component.html',
  styleUrls: ['./atendimento-print.component.scss']
})
export class AtendimentoPrintComponent implements OnInit {

  @Input()
  atendimentoSelecionado;

  constructor() { }

  ngOnInit() {
  }

}
