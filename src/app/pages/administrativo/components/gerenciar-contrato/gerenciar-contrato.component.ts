import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { JwtHelper } from 'angular2-jwt';
import { contains } from 'ramda';

import { propNameQuery } from 'app/shared/utils/StringUtils';
import { Contrato } from 'app/models';
import { ContratoService } from 'app/shared/services/contrato-service/contrato.service';
import { ModalContratoComponent } from './../modal-contrato/modal-contrato.component';


@Component({
  selector: 'app-gerenciar-contrato',
  templateUrl: './gerenciar-contrato.component.html',
  styleUrls: ['./gerenciar-contrato.component.scss']
})
export class GerenciarContratoComponent implements OnInit {

  public contratos$: Observable<any[]>;
  public carregando: boolean = true;
  public contratoSelecionado: Contrato;
  public totalRecords;
  private jwtHelper: JwtHelper = new JwtHelper();
  public average$: Observable<any>;
  public isShow = false;
  private opcoesModal: NgbModalOptions = {
    size: 'lg'
  };

  dateFrom = null;
  constructor(
    private contratoService: ContratoService,
    private _servicoModal: NgbModal
  ) { }


  getAverange() {
    const token = localStorage.getItem('token');
    const { login: { tipo } } = this.jwtHelper.decodeToken(token)._doc;
    const permission = tipo.filter(t => t === 'administrador' || t === 'contrato');

    if (permission.length > 0) {
      this.average$ = this.contratoService.summaryContract();
      return this.isShow = true;
    }
  }


  ngOnInit() {
    this.contratos$ = this.contratoService.contratosLazyLoad()
      .map(({ contratos, count }) => {
        this.totalRecords = count;
        this.carregando = false;
        return contratos;
      });

    this.getAverange();
  }

  abrirModalDeDetalhes(contratoID) {
    this.contratoService.getContrato(contratoID)
    .subscribe(res => {
      const referenciaModal = this._servicoModal.open(
        ModalContratoComponent,
        this.opcoesModal
      );
      referenciaModal.componentInstance.contratoSelecionado = res;
    });
  }

  filterEvents({ filters, first, rows }) {
    const queryFormatter = propNameQuery(filters);
    const newQuery: any = {
      ...queryFormatter('numeroContrato'),
      ...queryFormatter('cliente.nome_razao_social'),
      ...queryFormatter('cliente.cnpj_cpf'),
      ...queryFormatter('tipo')
    };
    return newQuery;
  }

  loadContratosLazy(event) {
    const query = this.filterEvents(event);
    if (query['cliente.cnpj_cpf']) {
      query['cliente.cnpj_cpf'] = query['cliente.cnpj_cpf'].replace(/\D+/g, '');
    }
    const skip = event.first;
    const limit = event.rows;

    this.contratos$ = this.contratoService
      .contratosLazyLoad(skip, limit, query)
        .map(({ contratos, count }) => {
          this.totalRecords = count;
          this.carregando = false;
          return contratos;
        });
  }

  changeColorText(contrato) {
    if (!contrato.ativo) { return 'text-danger'; }
  }
}
