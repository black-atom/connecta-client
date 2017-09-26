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
  dataInicia = new Date('2017-09-18T03:00:00.000Z');
  dataFinal = new Date('2017-09-25T17:17:48.032Z');
  tecnicos;

  constructor(
    private _funcionarioService: FuncionarioService,
    private _atendimentoService: AtendimentoService) { }

  ngOnInit() {
    this.listarAtendimento();
  }

  // listarFuncionarios() {
  //   this._funcionarioService.retornarFuncionarioPorFuncao(this.funcao[2])
  //   .subscribe(
  //     res => {
  //       console.log(res);
  //     }
  //   );
  // }

  listarAtendimento() {
    const atendimentos = this._atendimentoService.retornarTodos()
    .subscribe(
      res => {
       const ver = res.filter(busca => {
          const dataAtendimento = new Date(busca.data_atendimento);

          if (dataAtendimento >= this.dataInicia && dataAtendimento <= this.dataFinal) {
            return (busca);
          }
      });
  });
}


  }
