import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dados-cliente',
  templateUrl: './dados-cliente.component.html',
  styleUrls: ['./dados-cliente.component.scss']
})
export class DadosClienteComponent implements OnInit {

  @Input()
  contratoSelecionadoDetail;

  constructor() { }

  ngOnInit() {
  }

}
