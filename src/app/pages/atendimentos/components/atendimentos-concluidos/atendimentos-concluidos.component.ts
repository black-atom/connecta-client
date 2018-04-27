import {
  Component,
  OnInit,
} from '@angular/core';

import {
  NgbModal,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Rx';

import {
  AtendimentoService,
  AtividadeService,
} from 'app/shared/services';

import { AtendimentoConcluidoDetalhesComponent } from './atendimento-concluido-detalhes/atendimento-concluido-detalhes.component';


@Component({
  selector: 'app-atendimentos-concluidos',
  templateUrl: './atendimentos-concluidos.component.html',
  styleUrls: ['./atendimentos-concluidos.component.scss']
})
export class AtendimentosConcluidosComponent implements OnInit {

  public atendimentos$: Observable<any[]>;
  private today = new Date();
  public totalRecords;
  public carregando = true;
  private opcoesModal: NgbModalOptions = {
    size: 'lg'
  };

  public inputDate;

  private query = {
    skip: 0,
    limit: 0,
  };

  constructor(
    private _servicoModal: NgbModal,
    private _atividadeService: AtividadeService,
    private _atendimentoService: AtendimentoService,
  ) { }

  ngOnInit() {

    this.inputDate = {
      year: this.today.getFullYear(),
      day: this.today.getDate(),
      month: this.today.getMonth() + 1
    };
    this.getAtendimentosEAtividades();
  }

  getAtendimentosEAtividades() {
    this.carregando = true;
    this.atendimentos$ = this._atendimentoService
    .atendimentosLazyLoad({ ...this.query, data_atendimento: this.dataPassadoPeloUsuario(this.inputDate) })
    .switchMap(({ atendimentos, count }) => Observable
        .timer(0, 1000 * 30)
        .map(() => atendimentos)
    )
    .switchMap((atendimentos, count) => {
      return this._atividadeService
        .getAllAtividadesPorData({ date: this.inputDate })
        .map(({ atividades }) => {
          return atendimentos
          .map(atendimento => {
            const atividadeFound = atividades.length > 0 ? atividades.find(at => at.atendimento_id === atendimento._id) : null;
            this.carregando = false;
            // tslint:disable-next-line:curly
            if (!atividadeFound) return { ...atendimento, monitoramento: { status: 'PENDENTE' } };
            return { ...atendimento, monitoramento: atividadeFound };
        });
      });

    });
  }

  abrirModalDeDetalhes(atendimentoSelecionado) {
    const referenciaModal = this._servicoModal
      .open(
        AtendimentoConcluidoDetalhesComponent,
        this.opcoesModal
      );
    referenciaModal.componentInstance.atendimentoSelecionado = atendimentoSelecionado;
  }

  dataPassadoPeloUsuario(dataSelecionada) {
    const dataFormatada = new Date(
      dataSelecionada.year,
      dataSelecionada.month - 1,
      dataSelecionada.day
    );
    return dataFormatada.toString();
  }


}
