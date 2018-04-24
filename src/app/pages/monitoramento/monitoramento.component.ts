import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
  applySpec,
  prop
} from 'ramda';

import {
  AtendimentoService,
  AtividadeService,
  FuncionarioService,
  MonitoramentoService,
} from './../../shared/services';

import {
  Funcionario,
  Atendimento,
  MonitoramentoStatuses,
  statuses,
  MonitoramentoInfo
} from './../../models';

@Component({
  selector: 'app-monitoramento',
  templateUrl: './monitoramento.component.html',
  styleUrls: ['./monitoramento.component.scss']
})

export class MonitoramentoComponent implements OnInit {

  public tecnicos$: Observable<any[]>;
  private date = new Date();
  private tipoFuncionario = { 'login.tipo': 'tecnico' };
  private today = new Date().toString();

  constructor(
    private atendimentoService: AtendimentoService,
    private funcionarioService: FuncionarioService,
    private atividadeService: AtividadeService,
  ) { }

  ngOnInit() {
    const calcTotalByStatus = status => (funcionario: Funcionario) => funcionario.atividades.filter(at => at.status === status).length;

    const getAtividadeAtual = (funcionario: Funcionario) => funcionario.atividades.find(at => statuses[at.status] === 'execucao');

    const formatToMonitoramento = applySpec({
      funcionarioName: prop('nome'),
      foto_url: prop('foto_url'),
      totalPendentes: calcTotalByStatus(MonitoramentoStatuses.pendente),
      totalPausados: calcTotalByStatus(MonitoramentoStatuses.pauseAtividade),
      totalConcluidos: calcTotalByStatus(MonitoramentoStatuses.fimAtividade),
      atividadeAtual: getAtividadeAtual
    });

    this.tecnicos$ = this.funcionarioService
      .retornarFuncionarioPorFuncao(this.tipoFuncionario)
      .switchMap(({ funcionarios }) => Observable
          .timer(0, 1000 * 30)
          .map(() => funcionarios)
      )
      .switchMap((funcionarios: Funcionario[]) => {
        return this.atendimentoService
          .atendimentosLazyLoad({ data_atendimento: this.today })
          .map(({ atendimentos }) => atendimentos as Atendimento[])
          .switchMap(atendimentos => this.atividadeService
            .getAllAtividadesPorData({ createdAt: this.today })
            .map(({ atividades }) => atividades)
            .map(atividades => atividades.map(atividade => {
              const atendimentoFound = atendimentos.find(atendimento => atendimento._id === atividade.atendimento_id);
              return atendimentoFound ? { ...atividade, atendimento: atendimentoFound } : atividade;
            }))
          )
          .map((atividades) => {
            return funcionarios.map(funcionario => {
              const funcAtividades = atividades.filter(atividade => atividade.funcionario_id === funcionario._id);
              return { ...funcionario, atividades: funcAtividades };
            });
          });
      })
      .map(funcionarios => funcionarios.filter(funcionario => funcionario.atividades.length > 0))
      .map((funcionarios: Funcionario[]) => funcionarios.map(formatToMonitoramento));
  }

}
