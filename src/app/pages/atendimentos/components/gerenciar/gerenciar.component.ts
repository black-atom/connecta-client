import { DesbloquearModalComponent } from './../desbloquear-modal/desbloquear-modal.component';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

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
export class GerenciarComponent implements OnInit {

  public atendimentos$: Observable<Atendimento[]>;
  public atendimentoSelecionado: Atendimento;
  public carregando: boolean = true;

  public totalRecords;
  private query = { skip : 0, limit : 25 };

  public opcoesModal: NgbModalOptions = {
    size: 'lg'
  };

  constructor(
    private _atendimentoService: AtendimentoService,
    private _servicoModal: NgbModal
  ) {}


  ngOnInit() {
    this.getAtendimentos();
  }

  getAtendimentos() {
    this.atendimentos$ = this._atendimentoService
    .atendimentosLazyLoad(this.query)
      .map(({ atendimentos, count }) => {
        this.totalRecords = count;
        this.carregando = false;
        return atendimentos;
      });
  }
  mudarEstiloLinha(atendimento) {
    const estado = atendimento.motivos.find(motivo => motivo.estado === 'reagendado');

    // tslint:disable-next-line:curly
    if (atendimento.liberacao && atendimento.liberacao._id) return 'liberado';
    // tslint:disable-next-line:curly
    if (estado && atendimento.estado !== 'cancelado' && atendimento.estado !== 'associado') return 'reagendado';
    // tslint:disable-next-line:curly
    if (atendimento.estado === 'cancelado') return 'cancelado';
    // tslint:disable-next-line:curly
    if (atendimento.estado === 'associado') return 'associado';
    // tslint:disable-next-line:curly
    if (atendimento.estado === 'bloqueado') return 'bloqueado';
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

  checkedLastAtendimento(atendimento) {
    const referenciaModal = this._servicoModal.open(
      DesbloquearModalComponent,
      this.opcoesModal
    );
    referenciaModal.componentInstance.atendimentoSelecionado = atendimento;
    referenciaModal.result
      .then(res => this.getAtendimentos())
      .catch(() => {});
  }

  filterEvents({ filters, first, rows }) {
    const queryFormatter = propNameQuery(filters);
    const queryParse: any = {
      ...queryFormatter('data_atendimento'),
      ...queryFormatter('cliente.nome_razao_social'),
      ...queryFormatter('cliente.cnpj_cpf'),
      ...queryFormatter('endereco.bairro'),
      ...queryFormatter('endereco.cep'),
      ...queryFormatter('endereco.cidade'),
      ...queryFormatter('tipo'),
      ...queryFormatter('tecnico.nome'),
      ...queryFormatter('createdBy'),
      skip : first,
      limit : rows
    };
    const newQuery = removeMaskFromPropTable('endereco.cep')(queryParse);
    return newQuery;
  }

  loadAtendimentosLazy(event) {

    const eventParse = this.filterEvents(event);
    const eventParseDate = formatQuery('data_atendimento')(eventParse);
    const query = removeMaskFromPropTable('cliente.cnpj_cpf')(eventParseDate);

    this.atendimentos$ = this._atendimentoService
      .atendimentosLazyLoad(query)
        .map(({ atendimentos, count }) => {
          this.totalRecords = count;
          this.carregando = false;
          return atendimentos;
        });
  }

  print(atendimento): void {
    this._atendimentoService.retornarUm(atendimento).subscribe(res => this.atendimentoSelecionado = res);
    setTimeout(() => window.print(), 500);
  }


}
