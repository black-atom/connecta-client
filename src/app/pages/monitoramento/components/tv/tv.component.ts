import { Avaliacao } from './../../../../models/avaliacoes';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input } from '@angular/core';
import {
  applySpec,
  prop,
  pathOr,
  pipe
} from 'ramda';

import {
  Funcionario,
  Atendimento,
  MonitoramentoStatuses,
  statuses,
  MonitoramentoInfo
} from './../../../../models';

import {
  AtendimentoService,
  AtividadeService,
  AvaliacoesService,
  FuncionarioService
} from './../../../../shared/services';


@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {


  public tecnicos$: Observable<any[]>;
  private date = new Date();
  private tipoFuncionario = { 'login.tipo': 'tecnico' };
  private today = new Date().toString();
  public data = new Date();

  constructor(
    private atendimentoService: AtendimentoService,
    private funcionarioService: FuncionarioService,
    private atividadeService: AtividadeService,
    private avaliacoesService: AvaliacoesService
  ) { }

  ngOnInit() {
    const calcTotalByStatus =
    status => (funcionario: Funcionario) =>
      funcionario.atividades.filter(at => at.status === status && at.tipo === 'atendimento').length;

    const getAtividadeAtual = (funcionario: Funcionario) => funcionario.atividades.find(at => statuses[at.status] === 'execucao');
    const getAlmoco = (funcionario: Funcionario) => funcionario.atividades.find(at => at.tipo === 'almoco') ? true : false;

    const formatToMonitoramento = applySpec({
      funcionarioName: prop('nome'),
      avaliacao: pathOr(0, ['avaliacao', 'rate']),
      foto_url: prop('foto_url'),
      totalPendentes: calcTotalByStatus(MonitoramentoStatuses.pendente),
      totalPausados: calcTotalByStatus(MonitoramentoStatuses.pauseAtividade),
      totalConcluidos: calcTotalByStatus(MonitoramentoStatuses.fimAtividade),
      atividadeAtual: getAtividadeAtual,
      almoco: getAlmoco,
      countTime: pipe(getAtividadeAtual, this.parseTime),
      status: pipe(getAtividadeAtual, this.parseStatus)
    });

  this.tecnicos$ = this.funcionarioService
    .retornarFuncionarioPorFuncao(this.tipoFuncionario)
    .switchMap(({ funcionarios }) => Observable
        .timer(0, 1000 * 30)
        .map(() => funcionarios)
    )
    .switchMap((funcionarios: Funcionario[]) => {
      return this.avaliacoesService
        .getAvaliacoes()
        .map((avaliacoes: Avaliacao[]) => {
          return funcionarios.map(func => (
            {
              ...func,
              avaliacao: avaliacoes.find(av => av._id === func._id)
            }
          ));
        });
    })
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

  parseStatus(atividade) {
    const statusTipe = {
      PAUSE_ATIVIDADE: 'Pausado',
      INICIO_ATIVIDADE: 'Inicio Atividade',
      FIM_ATIVIDADE: 'Disponível',
      INICIO_DESLOCAMENTO: 'Deslocamento',
      FIM_DESLOCAMENTO: 'Fim Deslocamento',
      CRIAR_ATIVIDADE: 'Execução'
    };
    return  atividade && atividade.status ? statusTipe[atividade.status] : 'Disponível' ;
  }

  parseTime(atividade) {
    if (atividade && atividade.status) {
      const monitoramentoAtual = atividade.monitoramentos.find(at => at.status === 'INICIO_ATIVIDADE');
      if (monitoramentoAtual) {
        const dateStart = new Date(monitoramentoAtual.date).getHours();
        const dateNow = new Date().getHours();
        const hourDiff = dateNow - dateStart;
        return new Date().setHours(hourDiff);
      }
    }
    return null;
  }

}
