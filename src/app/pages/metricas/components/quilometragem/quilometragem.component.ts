import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ModuloCompartilhado } from 'app/shared/shared.module';
import { Funcionario, Atendimento } from 'app/models';
import { TIPOFUNCIONARIOMOCK } from './../../../../utils/mocks/tipo-funcionario.mock';
import { getFuncionario } from 'app/pages/login/redux/login.reducer';
import { FuncionarioService, MonitoramentoService } from 'app/shared/services';

@Component({
  selector: 'app-quilometragem',
  templateUrl: './quilometragem.component.html',
  styleUrls: ['./quilometragem.component.scss']
})
export class QuilometragemComponent implements OnInit {

  private date = new Date();
  public inputDate: any;

  public atendimentos$: Observable<Atendimento[]>;
  public funcionarios$: Observable<any[]>;
  public funcionarioSelecionado;
  
  private tipoFuncionario = { 'login.tipo': TIPOFUNCIONARIOMOCK[2] };

  constructor(public _funcionariosService: FuncionarioService,
              public _monitoramentoService: MonitoramentoService ) {}

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

            return { ...funcionario, monitoramentos };

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
