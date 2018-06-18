import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss']
})
export class FinanceiroComponent implements OnInit {

  @Input()
  contratoSelecionadoFinanceiro;

  constructor() { }

  ngOnInit() {
  }

}
