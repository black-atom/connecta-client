import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AtendimentoService, FuncionarioService } from 'app/shared/services';
import { Subject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-associar-map',
  templateUrl: './associar-map.component.html',
  styleUrls: ['./associar-map.component.scss']
})
export class AssociarMapComponent implements OnInit {

  lat = -23.724693;
  lng = -46.534283;

  public totalyAtendimentos;
  public atendimentos$: Observable<any[]>;
  public tecnicos$: Subject<any[]>;
  private date = new Date();
  public inputDate: any;
  public atentimentoSubject$: Subject<any>;
  public atendimentoOver;
  public tecnicoSelecionado;

  public icon = {
    selecionado: {
      url: '/assets/img/spotlight-poi1.png',
      scaledSize: {
        height: 43,
        width: 27
      }
    },
    associado: {
      url: '/assets/img/spotlight-poi2.png',
      scaledSize: {
        height: 43,
        width: 27
      }
    }
  };

  constructor(
    private atencimentoService: AtendimentoService,
    private funcionarioService: FuncionarioService
  ) {
    this.atentimentoSubject$ = new Subject();
    this.tecnicos$ = new ReplaySubject();

    this.atendimentos$ = this.atentimentoSubject$.switchMap(
      () => {
        return this.atencimentoService
          .getAtendimentosPorData({ data_atendimento: this.dataPassadoPeloUsuario(this.inputDate).toString() })
          .map(({ atendimentos, count }) => {
            this.totalyAtendimentos = count;
            return atendimentos;
          });
      });
  }

  ngOnInit() {
    this.inputDate = {
      year: this.date.getFullYear(),
      day: this.date.getDate(),
      month: this.date.getMonth() + 1
    };

    this.funcionarioService
      .retornarFuncionarioPorFuncao({ 'login.tipo': 'tecnico' })
      .map(({ funcionarios }) => funcionarios )
      .toPromise()
      .then(funcionarios => this.tecnicos$.next(funcionarios));

    setTimeout(() => this.atentimentoSubject$.next(), 0);
  }

  getAllAtendimentos () {
    console.log('update map');
    this.atentimentoSubject$.next();
  }

   dataPassadoPeloUsuario(dataSelecionada) {
    const dataFormatada = new Date(
      dataSelecionada.year,
      dataSelecionada.month - 1,
      dataSelecionada.day
    );
    return dataFormatada;
  }

  associarTecnico(idAtendimento, { nome, _id }) {
    const tecnico = { _id, nome };
    this.atencimentoService
      .associarAtendimento(idAtendimento, tecnico)
      .toPromise()
      .then(() => this.atentimentoSubject$.next());
   }

   mouseHoverAtendimento({ _id }) {
     this.atendimentoOver = _id;
   }

   mouseLeaveAtendimento() {
    this.atendimentoOver = null;
   }
}
