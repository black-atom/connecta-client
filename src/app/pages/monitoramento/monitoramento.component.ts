import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AtendimentoService, FuncionarioService, MonitoramentoService } from './../../shared/services';
import { Funcionario, Atendimento } from './../../models';
import { TIPOFUNCIONARIOMOCK } from './../../utils/mocks/tipo-funcionario.mock';

@Component({
  selector: 'app-monitoramento',
  templateUrl: './monitoramento.component.html',
  styleUrls: ['./monitoramento.component.scss']
})

export class MonitoramentoComponent implements OnInit {
  public tecnicos$: Observable<Funcionario[]>;
  private funcao = { 'login.tipo': TIPOFUNCIONARIOMOCK[2] };
  private date = new Date();
  private estado = 'associado';

  public notificationMessage = true;

  constructor(
    private _atendimentoService: AtendimentoService,
    private _funcionarioService: FuncionarioService,
    private _monitoramentoService: MonitoramentoService
  ) {}

  ngOnInit() {
    this.getFuncionariosEAtendimentos();
  }

  getFuncionariosEAtendimentos() {

    this.tecnicos$ = this._funcionarioService
      .retornarFuncionarioPorFuncao(this.funcao)
      .switchMap(resFuncionarios =>

        this._atendimentoService
          .getAtendimentosPorData({
            data_atendimento: this.getDateToday(this.date).toString(),
            estado: this.estado }
          )

          .map(resAtendimentos =>
            resFuncionarios.funcionarios.map(funcionario => {

              const atendimentoTecnico = resAtendimentos.atendimentos.filter(
                atendimento => atendimento.tecnico._id === funcionario._id
              );

             return { ...funcionario, atendimentos: atendimentoTecnico };

            }).filter(funcionario => {

              if (funcionario.atendimentos.length > 0) {
                this.notificationMessage = false;
                return funcionario;
              }

            })
          )
      )
      .switchMap(funcionarios =>
        this._monitoramentoService
          .getMonitoramentoPorData({
            data_hora_inicial_km: this.getDateToday(this.date).toString(),
            data_hora_final_virgente_local: null
          })

          .map(resMonitoramentos =>
            funcionarios.map(funcionario => {
              const estado = { estado: 'Disponível', tipo: '' };
              const monitoramentos = resMonitoramentos.quilometragens;

              if (monitoramentos.length === 0) {
                return { ...funcionario, estado };
              }

              const estadoNovo =
                monitoramentos.filter(monitoramento =>
                  monitoramento.id_funcionario === funcionario._id)
                    .reduce((prev, curr) => {
                    if (curr.dtKmFim === null) {
                      return { estado: 'Percurso Iniciado do', tipo: curr.tipo };
                    }
                    if (curr.inicio === null && curr.dtKmFim !== null) {
                      return { estado: 'Percuso Encerrado', tipo: curr.tipo };
                    }
                    if (curr.inicio !== null && curr.fim === null) {
                      return { estado: 'Inicío', tipo: curr.tipo };
                    }
                    if (curr.fim !== null) {
                      return { estado: 'Disponivel', tipo: '' };
                    }
                  }, {});

              if (estadoNovo.estado) {
                return { ...funcionario, estado: estadoNovo };
              }
              return { ...funcionario, estado };

            })
          )
      );
  }

  getDateToday(data) {
    const date = new Date(data);
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return today;
  }

  atendimentosConcluidos(atendimentos) {
    const finalizados = atendimentos.filter(atendimento => atendimento.interacao_tecnico.estado === 'fim_do_atendimento').length;
    return finalizados;
  }

  avaliacaoAtendimento(avaliacao) {
    const nota = avaliacao.reduce((prev, soma) => (prev + soma.valor) / avaliacao.length, 0);
    return nota;
  }

  progressBar(estado) {
    if (estado) {
      const estados = { em_deslocamento: 25, chegou_ao_destino: 50, inicio_atendimento: 75, fim_do_atendimento: 100 };
      return estados[estado];
    }
    return 0;
  }

}
