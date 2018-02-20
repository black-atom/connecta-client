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
  public statusDefault = 'Disponível';

  constructor(
    private _atendimentoService: AtendimentoService,
    private _funcionarioService: FuncionarioService,
    private _monitoramentoService: MonitoramentoService
  ) {}

  ngOnInit() {
    this.getFuncionariosEAtendimentos();
    this.avaliacaoAtendimento([{ p: 1, valor: 5 }, { p: 1, valor: 5 }, { p: 1, valor: 5 }]);
    // this._monitoramentoService
    // .getMonitoramentoPorData({ data_hora_inicial_km : this.getDateToday(this.date).toString() })
    // .subscribe(res => {
    //   console.log(this.getDateToday(this.date).toString());
    //   console.log(res);
    // });
  }

  getFuncionariosEAtendimentos() {
    this._funcionarioService
      .retornarFuncionarioPorFuncao(this.funcao)
      .subscribe(resFuncionarios =>
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
              console.log(resAtendimentos)    
              return { ...funcionario, atendimentos: atendimentoTecnico };
            })
          )
      );
  }

  getDateToday(data) {
    const date = new Date(data);

    const dateParse = {
      day: date.getDate(),
      month : date.getMonth(),
      year : date.getFullYear()
    };

    const today = new Date(dateParse.year, dateParse.month, dateParse.day);

    return today;
  }

  statusFuncionario(estado) {
    const estados = {
      em_deslocamento: 'Em deslocamento',
      chegou_ao_destino: 'Chegou ao destino',
      inicio_atendimento: 'Atendimento iniciado',
      fim_do_atendimento: 'Atendimento encerrado'
    };
    return estados[estado];
  }

  avaliacaoAtendimento(avaliacao) {
    const nota = avaliacao.reduce((prev, soma) => (prev + soma.valor) / avaliacao.length, 0);
     return nota;
  }

  progressBar(estado) {
    const estados = {
      em_deslocamento: 25,
      chegou_ao_destino: 50,
      inicio_atendimento: 75,
      fim_do_atendimento: 100
    };
    return estados[estado];
  }
}
