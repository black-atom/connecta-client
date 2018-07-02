import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AtendimentoService, FuncionarioService } from 'app/shared/services';

@Component({
  selector: 'app-associar-map',
  templateUrl: './associar-map.component.html',
  styleUrls: ['./associar-map.component.scss']
})
export class AssociarMapComponent implements OnInit {

  lat = -23.719012;
  lng = -46.523961;

  public totalyAtendimentos;
  public atendimentos$: Observable<any[]>;
  public tecnicos$: Observable<any[]>;
  private date = new Date();
  public inputDate: any;

  public icon = {
    url: '/assets/img/pin.png',
    scaledSize: {
      height: 35,
      width: 35
    }
  };

  constructor(
    private atencimentoService: AtendimentoService,
    private funcionarioService: FuncionarioService) { }

  ngOnInit() {

    this.inputDate = {
      year: this.date.getFullYear(),
      day: this.date.getDate(),
      month: this.date.getMonth() + 1
    };

    this.tecnicos$ = this.funcionarioService
      .retornarFuncionarioPorFuncao({ 'login.tipo': 'tecnico' })
        .map(({ funcionarios }) => funcionarios );

    this.getAllAtendimentos();
  }

  getAllAtendimentos() {
    return this.atendimentos$ = this.atencimentoService
      .getAtendimentosPorData({ data_atendimento: this.dataPassadoPeloUsuario(this.inputDate).toString() })
        .map(({ atendimentos, count }) => {
            this.totalyAtendimentos = count;
            return atendimentos;
          });
  }

   dataPassadoPeloUsuario(dataSelecionada) {
    const dataFormatada = new Date(
      dataSelecionada.year,
      dataSelecionada.month - 1,
      dataSelecionada.day
    );
    return dataFormatada;
  }

  associarTecnico(tecnico, idAtendimento) {
    this.atencimentoService
      .associarAtendimento(idAtendimento, tecnico)
      .subscribe(res => this.getAllAtendimentos());
   }

}
