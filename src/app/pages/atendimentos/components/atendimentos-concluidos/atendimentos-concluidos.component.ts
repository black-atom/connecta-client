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

  private opcoesModal: NgbModalOptions = {
    size: 'lg'
  };

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
    this.atendimentos$ = this._atendimentoService.atendimentosLazyLoad(this.query).switchMap(({ atendimentos, count }) => {
      return this._atividadeService.getAllAtividades().map(({ quilometragens: atividades }) => {
        return atendimentos.map(atendimento => {
          const atividadeFound = atividades.find(atividade => atividade.atendimento_id === atendimento._id);
          // tslint:disable-next-line:curly
          if (!atividadeFound) return atendimento;
          return { ...atendimento, monitoramento: atividadeFound };
        });
      });
    });
  }

  abrirModalDeDetalhes(atendimentoSelecionado) {
    console.log(atendimentoSelecionado);
    const referenciaModal = this._servicoModal.open(
      AtendimentoConcluidoDetalhesComponent,
      this.opcoesModal
    );
    referenciaModal.componentInstance.atendimentoSelecionado = atendimentoSelecionado;

  }
}
