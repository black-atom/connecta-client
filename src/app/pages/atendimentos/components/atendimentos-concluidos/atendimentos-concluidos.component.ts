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
import { Atividade } from '../../../../models';


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
          url: `https://storage.googleapis.com/blackatom-images/${imagem.url}`
        }))
      })))
      .switchMap((atendimentos) => {
        return this._atividadeService
          .getAllAtividadesPorData({ createdAt: this.dataPassadoPeloUsuario(this.inputDate) })
          .map(({ atividades }) => {
            return atendimentos
            .map(atendimento => {
              const atividadeFound = atividades.length > 0
                ? atividades.find(
                    (at: Atividade) => (
                      at.atendimento_id === atendimento._id
                        && at.funcionario_id === atendimento.tecnico._id
                    )
                  )
                : null;

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
    .map((atendimento: Atendimento) => ({
      ...atendimento,
      imagens: atendimento.imagens.map(imagem => ({
        ...imagem,
        url: `https://storage.googleapis.com/blackatom-images/${imagem.url}`
      }))
    }))
    .subscribe(atendimento =>
      referenciaModal.componentInstance.atendimentoSelecionado = atendimento);
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

  mudarEstiloLinha({ monitoramento }) {
    // tslint:disable-next-line:curly
    if (monitoramento.status === 'PENDENTE' ) return '';
    // tslint:disable-next-line:curly
    if (monitoramento.status === 'INICIO_DESLOCAMENTO' ) return 'aberto-por-tecnica';
    // tslint:disable-next-line:curly
    if (monitoramento.status === 'FIM_ATIVIDADE' || monitoramento.status === 'cancelado' ) return 'reagendado';
    return 'padrao';
  }

}
