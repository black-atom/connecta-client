import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from 'rxjs/Subscription';

import { AtendimentoService } from './../../shared/services';
import { Funcionario } from './../../models';

@Component({
  selector: 'app-monitoramento',
  templateUrl: './monitoramento.component.html',
  styleUrls: ['./monitoramento.component.scss']
})
export class MonitoramentoComponent implements OnInit {

  public tecnicos$: Observable<Funcionario[]>;
  private timerSubscription: AnonymousSubscription;

  constructor(private _atendimentoService: AtendimentoService) { }

  ngOnInit() {
   this.atualizaDados();
  }

  atualizaDados() {

    this._atendimentoService.getAllAtendimentosAssociados();
    this.tecnicos$ = this._atendimentoService.funcionarios;
    this.refresh();
  }

  refresh() {
    this.timerSubscription = Observable.timer(10000 * 6).first().subscribe(() => this.atualizaDados());
  }

  }
