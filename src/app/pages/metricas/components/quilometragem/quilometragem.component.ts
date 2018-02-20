import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ModuloCompartilhado } from 'app/shared/shared.module';
import { Funcionario, Atendimento, Monitoramento } from 'app/models';
import { TIPOFUNCIONARIOMOCK } from './../../../../utils/mocks/tipo-funcionario.mock';
import { getFuncionario } from 'app/pages/login/redux/login.reducer';
import { FuncionarioService, MonitoramentoService } from 'app/shared/services';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quilometragem',
  templateUrl: './quilometragem.component.html',
  styleUrls: ['./quilometragem.component.scss']
})
export class QuilometragemComponent implements OnInit {

  private date = new Date();
  public inputDate: any;
  public isCollapsed = false;
  public atendimentos$: Observable<Atendimento[]>;
  public funcionarios$: Observable<any[]>;
  public funcionarioSelecionado;

  private tipoFuncionario = { 'login.tipo': TIPOFUNCIONARIOMOCK[2] };

  constructor(public _funcionariosService: FuncionarioService,
              public _monitoramentoService: MonitoramentoService,
              config: NgbAccordionConfig) {
                config.closeOthers = true;
                config.type = 'info';
              }

  ngOnInit() {

    this.inputDate = {
      year: this.date.getFullYear(),
      day: this.date.getDate(),
      month: this.date.getMonth() + 1
    };

    this.getAllFuncionarios();
  }

  getFuncionario(funcionario) {
    this.funcionarioSelecionado = funcionario;
  }

  parseDate(date) {
    return new Date(date);
  }

  calcTimeMonitoramento(inicial, final) {
    const hourFloat = Math.abs((this.parseDate(final).getTime() - this.parseDate(inicial).getTime()) / 3600000);
    return this.floatToHour(hourFloat);
  }

  floatToHour(num) {
    let sign: any = num >= 0 ? 1 : -1;
    const min = 1 / 60;
    num = num * sign;

    const intpart = Math.floor(num);
    let decpart = num - intpart;

    decpart = min * Math.round(decpart / min);

    const minutes = Math.floor(decpart * 60);
    sign = sign === 1 ? '' : '-';
    return `${sign}${intpart}h ${minutes}m`;
  }


  getAllFuncionarios() {

    this.funcionarios$ = this. _funcionariosService
      .retornarFuncionarioPorFuncao(this.tipoFuncionario)
        .switchMap(resFuncionarios =>
          this._monitoramentoService
          .getMonitoramentoPorData({ data_hora_inicial_km : this.dataPassadoPeloUsuario(this.inputDate).toString() })
          .map(resMonitoramentos =>

          resFuncionarios.funcionarios.map(funcionario => {

            const monitoramentos = resMonitoramentos.quilometragens
            .filter(monitoramento => monitoramento.id_funcionario === funcionario._id);

            const timeMonitoramento = monitoramentos.map((monitoramento: Monitoramento) => {

              const tempoDeslocamento =
                this.calcTimeMonitoramento(monitoramento.data_hora_inicial_km, monitoramento.data_hora_final_km);

              const tempoEvento =
                this.calcTimeMonitoramento(monitoramento.data_hora_inicial_virgente_local, monitoramento.data_hora_final_virgente_local);

              const kmCalc = monitoramento.km_final - monitoramento.km_inicial;

              return {
                ...monitoramento,
                duracao_evento: tempoEvento,
                tempo_deslocamento: tempoDeslocamento,
                total_km_deslocamento: kmCalc
              };

            });

            return { ...funcionario, monitoramentos: timeMonitoramento };

          }).filter(funcionario => funcionario.monitoramentos.length > 0)

          )
        );
  }

  dataPassadoPeloUsuario(dataSelecionada) {
    const dataFormatada = new Date(
      dataSelecionada.year,
      dataSelecionada.month - 1,
      dataSelecionada.day
    );
    return dataFormatada;
  }

}
