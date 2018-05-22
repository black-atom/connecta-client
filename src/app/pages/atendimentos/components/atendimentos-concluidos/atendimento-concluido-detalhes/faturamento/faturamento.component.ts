import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-faturamento',
  templateUrl: './faturamento.component.html',
  styleUrls: ['./faturamento.component.scss']
})
export class FaturamentoComponent implements OnInit {

  @Input()
  faturamentoDetail;

  constructor() { }

  ngOnInit() {
  }

}
