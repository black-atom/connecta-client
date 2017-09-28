import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AtendimentoService } from './../../shared/services';
import { Funcionario } from './../../models';

@Component({
  selector: 'app-monitoramento',
  templateUrl: './monitoramento.component.html',
  styleUrls: ['./monitoramento.component.scss']
})
export class MonitoramentoComponent implements OnInit {

  public tecnicos: Observable<Funcionario[]>;
  private dataNata = new Date('2017-09-27T03:00:00.000Z');
  private dataInicia = new Date('2017-09-18T03:00:00.000Z');
  private dataFinal = new Date('2017-09-25T17:17:48.032Z');

  constructor(private _atendimentoService: AtendimentoService) { }

  ngOnInit() {
    this._atendimentoService.getAllAtendimentosAssociados();
    this.tecnicos = this._atendimentoService.funcionarios;
  }

  }
