import { Atendimento } from './../../../../models/atendimento.interface';
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
  private count = 1;
  public atendimentoSelecionado;
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
    this.atendimentos$ = Observable
      .timer(0, 1000 * 120)
      .do(() => this.carregando = true)
      .switchMap(() => this._atendimentoService
        .atendimentosLazyLoad({ ...this.query, data_atendimento: this.dataPassadoPeloUsuario(this.inputDate) })
      )
      .map(({ atendimentos }) => atendimentos)
      .map((atendimentos: Atendimento[]) => atendimentos.map(atendimento => ({
        ...atendimento,
        imagens: atendimento.imagens.map(imagem => ({
          ...imagem,
          url: `http://165.227.78.113:3000/atendimentoimagens/${imagem.url}`
        }))
      })))
      .switchMap((atendimentos) => {
        return this._atividadeService
          .getAllAtividadesPorData({ createdAt: this.dataPassadoPeloUsuario(this.inputDate) })
          .map(({ atividades }) => {
            return atendimentos
            .map(atendimento => {
              const atividadeFound = atividades.length > 0 ? atividades.find(at => at.atendimento_id === atendimento._id) : null;

              return !atividadeFound ?
                ({ ...atendimento, monitoramento: { status: 'PENDENTE' } }) :
                ({ ...atendimento, monitoramento: atividadeFound });
          });
        });
      })
      .do(() => this.carregando = true);
  }


  getOneAtendimento(_id) {
    return this._atendimentoService.retornarUm(_id);
  }

  abrirModalDeDetalhes({ _id }) {

    const referenciaModal = this._servicoModal
      .open(
        AtendimentoConcluidoDetalhesComponent,
        this.opcoesModal
      );

    this.getOneAtendimento(_id)
    .subscribe(
      atendimento =>
      referenciaModal.componentInstance.atendimentoSelecionado = atendimento
    );
  }

  dataPassadoPeloUsuario(dataSelecionada) {
    const dataFormatada = new Date(
      dataSelecionada.year,
      dataSelecionada.month - 1,
      dataSelecionada.day
    );
    return dataFormatada.toString();
  }

  print(atendimento): void {
    this.atendimentoSelecionado = atendimento;
    setTimeout(() => window.print(), 500);
  }
}
