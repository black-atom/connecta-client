import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-relatorio-tecnico-detail',
  templateUrl: './relatorio-tecnico-detail.component.html',
  styleUrls: ['./relatorio-tecnico-detail.component.scss']
})
export class RelatorioTecnicoDetailComponent implements OnInit {

  @Input()
  relatorioTecnico;

  constructor() { }

  ngOnInit() {
  }

}
