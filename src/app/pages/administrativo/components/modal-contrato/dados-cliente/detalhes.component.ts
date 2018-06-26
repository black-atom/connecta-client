import { Component, OnInit, Input } from '@angular/core';

import { Contrato } from 'app/models/contrato.interface';

@Component({
  selector: 'app-detalhes-modal',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesContratoModalComponent implements OnInit {

  @Input()
  public contrato: Contrato;

  constructor() { }

  ngOnInit() {
  }

}
