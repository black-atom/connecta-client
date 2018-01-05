// import { LazyLoadEvent } from 'primeng';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AtendimentoService } from './../../../../shared/services';
import { Atendimento } from './../../../../models/atendimento.interface';
import { VisualizacaoModalComponent } from './../visualizacao-modal/visualizacao-modal.component';
import { OverlayPanel } from 'primeng/components/overlaypanel/overlaypanel';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./gerenciar.component.scss']
})
export class GerenciarComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public atendimentos: Atendimento[];
  public atendimentoSelecionado: Atendimento;
  public carregando: boolean = true;
  public imagensInicioAtendimento: any[] = [];
  public imagensFinalAtendimento: any[] = [];
  public totalRecords;

  constructor(
    private _atendimentoService: AtendimentoService,
    private _servicoModal: NgbModal
  ) {}

  opcoesModal: NgbModalOptions = {
    size: 'lg'
  };

  ngOnInit() {
    this.subscription = this._atendimentoService
      .atendimentosLazyLoad()
      .subscribe(res => {
        this.atendimentos = res.atendimentos;
        this.totalRecords = res.count;
        this.carregando = false;
      });
  }

  mudarEstiloLinha(dadosLinha: Atendimento) {
    if (dadosLinha.tipo === 'Aberto por técnica') {
      return 'aberto-por-tecnica';
    } else if (dadosLinha.situacao.status === 'cancelar') {
      return 'cancelado';
    } else if (dadosLinha.situacao.status === 'reagendar') {
      return 'reagendamento';
    } else {
      return 'padrao';
    }
  }

  abrirModalDeDetalhes(atendimentoSelecionado) {
    this._atendimentoService
      .retornarUm(atendimentoSelecionado)
      .subscribe(res => {
        const referenciaModal = this._servicoModal.open(
          VisualizacaoModalComponent,
          this.opcoesModal
        );
        referenciaModal.componentInstance.atendimentoSelecionado = res;
      });
  }

  loadAtendimentosLazy(event) {
    this.carregando = true;
    this.subscription = this._atendimentoService
      .atendimentosLazyLoad(event.first, event.rows)
      .subscribe(res => {
        this.atendimentos = res.atendimentos;
        this.carregando = false;
      });
  }

  // abrirModalDeFotos(conteudo, atendimento) {
  //   this.atendimentoSelecionado = atendimento;
  //   this._servicoModal.open(conteudo, this.opcoesModal)

  // }

  carregarFotos(atendimento: Atendimento) {
    this.atendimentoSelecionado = atendimento;

    this.imagensInicioAtendimento = atendimento.imagens
      .filter(imagem => imagem.tipo === 'inicio_atendimento')
      .map(img => `http://165.227.78.113:3000/atendimentoimagens/${img.url}`);

    this.imagensFinalAtendimento = atendimento.imagens
      .filter(imagem => imagem.tipo === 'fim_atendimento')
      .map(img => `http://165.227.78.113:3000/atendimentoimagens/${img.url}`);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



