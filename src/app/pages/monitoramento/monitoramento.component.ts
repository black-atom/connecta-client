import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Observable,
  Subscription
} from 'rxjs/Rx';
import {
  AnonymousSubscription
} from 'rxjs/Subscription';

import {
  AtendimentoService
} from './../../shared/services';
import {
  Funcionario
} from './../../models';
import {
  Atendimento
} from '../../models/atendimento.interface';

@Component({
  selector: 'app-monitoramento',
  templateUrl: './monitoramento.component.html',
  styleUrls: ['./monitoramento.component.scss']
})
export class MonitoramentoComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public tecnicos$: Observable < Funcionario[] > ;
  private timerSubscription: AnonymousSubscription;

  constructor(private _atendimentoService: AtendimentoService) {}

  ngOnInit() {
    this.atualizaDados();
  }

  aplicarIcones(tecnico) {
    if (tecnico.media === 0) {
      return 'ion-ios-star-outline';
    } else if (tecnico.media > 0) {
      return 'ion-ios-star-half';
    } else if (tecnico.media >= 3) {
      return 'ion-star';
    } else if (tecnico.media === 5) {
      return 'ion-trophy';
    } else {
      return 'ion-ios-star-outline';
    }
  }

  aplicarIconeAtendimento(atendimento) {
    switch (atendimento.estado) {
      case 'associado':
        return 'fa fa-thumb-tack';

      case 'em_deslocamento':
        return 'ion-model-s';

      case 'chegou_ao_destino':
        return 'fa fa-flag-checkered';

      case 'inicio_atendimento':
        return 'fa fa-wrench';

      case 'fim_do_atendimento':
        return 'ion-checkmark';
    }
  }

  alterarCorAtendimento(tecnico) {
    switch (tecnico.estado) {

      case 'em_deslocamento':
        return 'em_deslocamento_cor';

      case 'chegou_ao_destino':
        return 'chegou_ao_destino_cor';

      case 'inicio_atendimento':
        return 'inicio_atendimento_cor';
    }
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
