import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AtendimentoService } from './../../../../shared/services';
import { Atendimento } from './../../../../models/atendimento.interface';
import { VisualizacaoModalComponent } from './../visualizacao-modal/visualizacao-modal.component';
import { removeMaskFromPropTable, propNameQuery, formatQuery } from 'app/shared/utils/StringUtils';


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
  private query = { skip : 0, limit : 25 };

  constructor(
    private _atendimentoService: AtendimentoService,
    private _servicoModal: NgbModal
  ) {}

  opcoesModal: NgbModalOptions = {
    size: 'lg'
  };

  ngOnInit() {
    this.subscription = this._atendimentoService
      .atendimentosLazyLoad(this.query)
        .subscribe(res => {
          this.atendimentos = res.atendimentos;
          this.totalRecords = res.count;
          this.carregando = false;
        });
  }

  mudarEstiloLinha(atendimento) {
    const estado = atendimento.motivos.find(motivo => motivo.estado === 'reagendado');
    if (estado && atendimento.estado !== 'cancelado' && atendimento.estado !== 'associado') {
      return 'reagendado';
    }

    if (atendimento.estado === 'cancelado') {
      return 'cancelado';
    }
    if (atendimento.estado === 'associado') {
      return 'associado';
    }

    return 'padrao';
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

  filterEvents(query) {
    const queryFormatter = propNameQuery(query.filters);
    const newQuery: any = {
      ...queryFormatter('data_atendimento'),
      ...queryFormatter('cliente.nome_razao_social'),
      ...queryFormatter('cliente.cnpj_cpf'),
      ...queryFormatter('endereco.bairro'),
      ...queryFormatter('endereco.cidade'),
      ...queryFormatter('tipo'),
      ...queryFormatter('tecnico.nome'),
      ...queryFormatter('createdBy'),
      skip : query.first,
      limit : query.rows
    };
    return newQuery;
  }

  loadAtendimentosLazy(event) {

    const eventParse = this.filterEvents(event);
    const eventParseDate = formatQuery('data_atendimento')(eventParse);
    const query = removeMaskFromPropTable('cliente.cnpj_cpf')(eventParseDate);

    this.subscription = this._atendimentoService
      .atendimentosLazyLoad(query)
        .subscribe(res => {
          this.atendimentos = res.atendimentos;
          this.totalRecords = res.count;
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
