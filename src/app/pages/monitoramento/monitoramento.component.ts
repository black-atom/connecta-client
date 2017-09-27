import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../shared/services/funcionario-service';
import { TIPOFUNCIONARIOMOCK } from './../../utils/mocks/tipo-funcionario.mock';
import { AtendimentoService } from './../../shared/services/atendimento-service';

import { Funcionario } from './../../models/funcionario.interface';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-monitoramento',
  templateUrl: './monitoramento.component.html',
  styleUrls: ['./monitoramento.component.scss']
})
export class MonitoramentoComponent implements OnInit {

  tecnicos$: Observable<Funcionario[]>;

  private funcao = TIPOFUNCIONARIOMOCK;
  private dataNata = new Date('2017-09-27T03:00:00.000Z');
  private dataInicia = new Date('2017-09-18T03:00:00.000Z');
  private dataFinal = new Date('2017-09-25T17:17:48.032Z');
  public tecnicosMonitoramento;
  contagem = 0;

  constructor(
    private _funcionarioService: FuncionarioService,
    private _atendimentoService: AtendimentoService) { }

  ngOnInit() {
    this.monitorarTecnicos();
  }

  monitorarTecnicos() {
    this._funcionarioService.retornarFuncionarioPorFuncao(this.funcao[2])
    .subscribe(
      tecnicos => {
        tecnicos.map(
          tecnico => {
            this._atendimentoService.retornarTodos()
            .subscribe(
              atendimentos => {
               const buscarPorData = atendimentos.filter(atendimento => {
                  const dataAtendimento = new Date(atendimento.data_atendimento);

                  if (dataAtendimento >= this.dataInicia && dataAtendimento >= this.dataInicia) {
                    return (atendimento);
                  }
              });
              const filtrarTecnico = buscarPorData.filter(
                 atendimento => {
                  const compara = tecnico._id === atendimento.tecnico._id;
                  if (compara) {
                   return atendimento;
                  }
                 }
                );

                tecnico.atendimentos = filtrarTecnico;
                tecnico.atendimentos_hoje = filtrarTecnico.filter(
                  atendimento => {
                    const hoje = new Date(atendimento.data_atendimento) >= this.dataNata;
                    if (hoje) {
                      if (atendimento.fim) {
                         tecnico.finalizado_hoje = this.contagem += 1;
                      }
                      return atendimento;
                    }
                  }
                );

                return tecnico;
          });

          }
        );
        this.tecnicosMonitoramento = tecnicos;
      }
    );
  }

  }
