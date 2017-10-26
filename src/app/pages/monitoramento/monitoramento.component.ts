import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { AnonymousSubscription } from 'rxjs/Subscription';

import { AtendimentoService } from './../../shared/services';
import { Funcionario } from './../../models';

@Component({
  selector: 'app-monitoramento',
  templateUrl: './monitoramento.component.html',
  styleUrls: ['./monitoramento.component.scss']
})
export class MonitoramentoComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public tecnicos$: Observable<Funcionario[]>;
  private timerSubscription: AnonymousSubscription;

  constructor(private _atendimentoService: AtendimentoService) { }

  ngOnInit() {
   this.atualizaDados();
  }

  atualizaDados() {
    this._atendimentoService.getAllAtendimentosAssociados();
    this.tecnicos$ = this._atendimentoService.funcionarios;
    this.atualizaPagina();
  }

  atualizaPagina() {
    this.timerSubscription = Observable.timer(10000 * 6).first().subscribe(() => this.atualizaDados());
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }
}
