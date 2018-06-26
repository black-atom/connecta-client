import { Component, OnInit, Input } from '@angular/core';

import { Contrato } from 'app/models';

@Component({
  selector: 'app-anexos-modal',
  templateUrl: './anexos.component.html',
  styleUrls: ['./anexos.component.scss']
})
export class AnexosModalComponent implements OnInit {

  @Input()
  contrato: Contrato;

  constructor() { }

  ngOnInit() { }

}
