import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})

export class HistoricoComponent implements OnInit {

  @Input()
  public contratoSelecionadoHistorico;

  constructor() { }

  ngOnInit() {

  }

}
