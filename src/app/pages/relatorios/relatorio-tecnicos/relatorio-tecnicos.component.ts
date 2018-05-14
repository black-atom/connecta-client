import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import * as R from 'ramda';
// import * as moment from 'moment';

import {
  AtividadeService,
  AtendimentoService,
  FuncionarioService
} from '../../../shared/services';

import {
  Atividade,
  Funcionario,
  Atendimento,
  MonitoramentoStatuses,
  statuses,
  MonitoramentoInfo } from '../../../models';

import { Avaliacao } from '../../../models/avaliacoes';
import { TIPOFUNCIONARIOMOCK } from './../../../utils/mocks/tipo-funcionario.mock';

@Component({
  selector: 'app-relatorio-tecnicos',
  templateUrl: './relatorio-tecnicos.component.html',
  styleUrls: ['./relatorio-tecnicos.component.scss']
})

export class RelatorioTecnicosComponent implements OnInit {

  public tecnicos$: Observable<any[]>;
  public tecnicoSelecionado$;
  public atividades$;
  private tipoFuncionario = { 'login.tipo': 'tecnico' };
  private today = new Date().toString();
  private date = new Date();
  public inputDate: any;

  constructor(
    private atendimentoService: AtendimentoService,
    private funcionarioService: FuncionarioService,
    private atividadeService: AtividadeService
  ) { }

  ngOnInit() {
    this.inputDate = {
      year: this.date.getFullYear(),
      day: this.date.getDate(),
      month: this.date.getMonth() + 1
    };
    this.getAtividadesPorFuncionario();
  }

  getAtividadesPorFuncionario() {
    this.tecnicos$ = this.funcionarioService
    .retornarFuncionarioPorFuncao(this.tipoFuncionario)
    .switchMap(({ funcionarios }) => Observable
        .timer(0, 1000 * 60)
        .map(() => funcionarios)
    )
    .switchMap((funcionarios: Funcionario[]) => {
      return this.atendimentoService
        .getAtendimentosPorData({ data_atendimento: this.dataPassadoPeloUsuario(this.inputDate).toString() })
        .map(({ atendimentos }) => atendimentos as Atendimento[])
        .switchMap(atendimentos => this.atividadeService
          .getAllAtividadesPorData({ createdAt: this.dataPassadoPeloUsuario(this.inputDate).toString() })
          .map(({ atividades }) => {
            return atividades;
          })
          .map(atividades => atividades.map(atividade => {
            const atendimentoFound = atendimentos.find(atendimento => atendimento._id === atividade.atendimento_id);
            return atendimentoFound ? { ...atividade, atendimento: atendimentoFound } : atividade;
          }))
        )
        .map((atividades) => {
          return funcionarios.map(funcionario => {
            const funcAtividades = atividades.filter(atividade => atividade.funcionario_id === funcionario._id);
            this.atividades$ = funcAtividades;
            return { ...funcionario, atividades: funcAtividades };
          });
        });
    })
    .map(funcionarios => funcionarios.filter(funcionario => funcionario.atividades.length > 0))
    .do(data => JSON.stringify(data));
    this.tecnicoSelecionado$ = undefined;
  }

  dataPassadoPeloUsuario(dataSelecionada) {
    const dataFormatada = new Date(
      dataSelecionada.year,
      dataSelecionada.month - 1,
      dataSelecionada.day
    );
    return dataFormatada;
  }

  selectedFuncionario(tecnico) {
    this.ordenarPorHora(tecnico);
    this.tecnicoSelecionado$ = tecnico;
  }

  print(): void {
    setTimeout(() => window.print(), 500);
  }

  parseStatus(status: string): string {
    switch (status) {
      case 'INICIO_DESLOCAMENTO' :
        return 'Início do deslocamento';
      case 'FIM_DESLOCAMENTO' :
        return 'Fim do deslocamento';
      case 'INICIO_ATIVIDADE' :
        return 'Início da atividade';
      case 'FIM_ATIVIDADE' :
        return 'Fim da atividade';
      case 'PAUSE_ATIVIDADE' :
        return 'Pausou a atividade';
      case 'CANCELA_ATIVIDADE' :
        return 'Cancelou a atividade';
    }
  }

  ordenarPorHora(tecnico) {
    const sortByDate = R.sortBy(R.prop('updatedAt'));
    const atividades = tecnico.atividades.map(res => res);
    tecnico.atividades = sortByDate(atividades);
  }

  parseTipoAtividade(tipo: string): string {
    switch (tipo) {
      case 'almoco':
        return 'ALMOÇO';
      case 'abastecimento':
        return 'ABASTECIMENTO';
      case 'empresa':
        return 'RETORNO PARA REALPONTO';
    }
  }

}
