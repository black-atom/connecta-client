import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AtendimentoService, FuncionarioService } from './../../shared/services';
import { Funcionario, Atendimento } from './../../models';
import { TIPOFUNCIONARIOMOCK } from './../../utils/mocks/tipo-funcionario.mock';

@Component({
  selector: 'app-monitoramento',
  templateUrl: './monitoramento.component.html',
  styleUrls: ['./monitoramento.component.scss']
})
export class MonitoramentoComponent implements OnInit {

  public tecnicos$: Observable<Funcionario[]>;
  private funcao = TIPOFUNCIONARIOMOCK[2];
  private date = new Date();

  constructor(
    private _atendimentoService: AtendimentoService,
    private _funcionarioService: FuncionarioService
  ) {}

  ngOnInit() {
    this.getFuncionariosEAtendimentos();
  }

  getFuncionariosEAtendimentos() {

    this.tecnicos$ = this._funcionarioService
      .retornarFuncionarioPorFuncao(this.funcao)
      .switchMap(tecnicos =>

        this._atendimentoService
          .getAtendimentosAssociadoPorData(this.getDateToday())
          .map(atendimentos =>

            tecnicos.map(funcionario => {
              const atendimentoTecnico = atendimentos.filter(
                atendimento => atendimento.tecnico._id === funcionario._id
              );

              return { ...funcionario, atendimentos: atendimentoTecnico };

            })
          )

      );
  }

  getDateToday() {
    const date = this.date;
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const today = new Date(year, month, day);
    return today;
  }

  aplicarIconesMetricas(tecnico) {
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
}
