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
    let isViewed;
    if (atendimento.isViewed) {
      isViewed = false;
    }else {
      isViewed = true;
    }

    this._atendimentoService
      .atualizarAtendimentoTecnica({ ...atendimento, isViewed })
      .subscribe(atendimentoRes => this.atendimentoSelecionado = atendimentoRes);
  }

  isFaturado(atendimento) {

    let faturamento;
    const isViewed = true;

    if (atendimento.faturamento && atendimento.faturamento.status) {
      faturamento = { status: false, faturamentoAt: new Date() };
    }else {
      faturamento = { status: true, faturamentoAt: new Date() };
    }

    this._atendimentoService
      .atualizarAtendimentoTecnica({ ...atendimento, isViewed, faturamento })
      .subscribe(atendimentoRes => this.atendimentoSelecionado = atendimentoRes);
  }

  fecharModal() {
    this.modalAtiva.close();
  }

  getTab(tabSelecionada) {
    this.tabActived = tabSelecionada;
  }
}
