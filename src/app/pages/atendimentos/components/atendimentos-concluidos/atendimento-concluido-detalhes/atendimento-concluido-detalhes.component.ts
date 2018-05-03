import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Atendimento } from 'app/models';
import { AtendimentoService } from './../../../../../shared/services/atendimento-service/atendimento.service';

@Component({
  selector: 'app-atendimento-concluido-detalhes',
  templateUrl: './atendimento-concluido-detalhes.component.html',
  styleUrls: ['./atendimento-concluido-detalhes.component.scss']
})
export class AtendimentoConcluidoDetalhesComponent implements OnInit {

  @Input()
  atendimentoSelecionado: Atendimento;

  public tabActived = 'atendimento';

  constructor(
    public modalAtiva: NgbActiveModal,
    private _atendimentoService: AtendimentoService,
  ) { }

  ngOnInit() {
  }

  isViewed(atendimento) {
    const isViewed = atendimento.isViewed ? false : true;
    this._atendimentoService
      .atualizarAtendimento({ ...atendimento, isViewed })
      .subscribe(atendimentoRes => this.atendimentoSelecionado = atendimentoRes);
  }

  isFaturado(atendimento) {

    const isViewed = true;
    const faturamento = atendimento.faturamento.status
    ? { status: false, faturamentoAt: new Date() }
    : { status: true, faturamentoAt: new Date() };

    this._atendimentoService
      .atualizarAtendimento({ ...atendimento, isViewed, faturamento })
      .subscribe(atendimentoRes => this.atendimentoSelecionado = atendimentoRes);
  }

  fecharModal() {
    this.modalAtiva.close();
  }

  getTab(tabSelecionada) {
    this.tabActived = tabSelecionada;
  }
}
