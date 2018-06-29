import { Component, OnInit, Input } from '@angular/core';

import { Proposta, Contrato } from 'app/models';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})

export class HistoricoComponent implements OnInit {

  @Input()
  public contrato: Contrato;

  @Input()
  public propostas: Proposta[];

  constructor() { }

  ngOnInit() { }

}
