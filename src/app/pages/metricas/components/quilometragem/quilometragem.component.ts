import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { ModuloCompartilhado } from 'app/shared/shared.module';
import { Funcionario, Atendimento } from 'app/models';
import { FuncionarioService } from '../../../../shared/services/funcionario-service'
import { TIPOFUNCIONARIOMOCK } from './../../../../utils/mocks/tipo-funcionario.mock';
import { getFuncionario } from 'app/pages/login/redux/login.reducer';



@Component({
  selector: 'app-quilometragem',
  templateUrl: './quilometragem.component.html',
  styleUrls: ['./quilometragem.component.scss']
})
export class QuilometragemComponent implements OnInit {

  private date = new Date();
  public inputDate: any;
  public dataSelecionada: any;
  private subscription: Subscription;
  public atendimentos$: Observable<Atendimento[]>;
  public funcionarios$: Observable<Funcionario[]>;
  public monitoramentos$: Observable<any[]>
  public funcionarioSelecionado;
  private tipoFuncionario = TIPOFUNCIONARIOMOCK[2];

  // public km = [
  //   {
  //     km_final: 2990,
  //     km_inicial: 3000,
  //     data_hora_inicial_km: "2017-10-19T21:26:31.925Z",
  //     data_hora_final_km: "2017-10-19T21:26:36.796Z",
  //     data_hora_inicial_virgente_local: "2017-10-19T21:26:39.156Z",
  //     data_hora_final_virgente_local: "2017-10-19T21:26:42.701Z",
  //     cliente: 'seu kinkas',
  //   }
  // ]


  constructor( public _funcionariosService: FuncionarioService,
               public _monitoramentoService: any ) {}

  ngOnInit() {
    this.inputDate = {
      year: this.date.getFullYear(),
      day: this.date.getDate(),
      month: this.date.getMonth() + 1
    };
    this.getAllFuncionario()
  }

  getFuncionario(funcionario){
    this.funcionarioSelecionado = funcionario;
  }

  getAllFuncionario() {
    this.funcionarios$ = this._funcionariosService
      .retornarFuncionarioPorFuncao(this.tipoFuncionario);
  }

  gettAllMonitoramento() {
    this.monitoramentos$ = this._monitoramentoService
      .retornarTodos()
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
