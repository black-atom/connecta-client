import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { JwtHelper } from 'angular2-jwt';
import { contains } from 'ramda';

import { propNameQuery } from 'app/shared/utils/StringUtils';
import { Contrato } from 'app/models';
import { ContratoService } from 'app/shared/services/contrato-service/contrato.service';
import { ModalContratoComponent } from './../modal-contrato/modal-contrato.component';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmationModal } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';


@Component({
  selector: 'app-gerenciar-contrato',
  templateUrl: './gerenciar-contrato.component.html',
  styleUrls: ['./gerenciar-contrato.component.scss']
})
export class GerenciarContratoComponent implements OnInit {

  public contratos$: Observable<any[]>;
  public contratosSubject$: Subject<any>;
  public carregando: boolean = true;
  public contratoSelecionado: Contrato;
  public totalRecords;
  private jwtHelper: JwtHelper = new JwtHelper();
  public average$: Observable<any>;
  public isShow = false;
  public isUserAllowed = false;
  public canUserSeeContractTotal = false
  private opcoesModal: NgbModalOptions = {
    size: 'lg'
  };
  private skip = 0;
  private defaultSearchQuery: any = { };
  public isTotalVisible = false

  dateFrom = null;
  constructor(
    private contratoService: ContratoService,
    private _servicoModal: NgbModal,
    private _notificacaoService: NotificationsService,
  ) { }

  handleTotalCardPress () {
    this.isTotalVisible = !this.isTotalVisible
  }

  getAverange() {
    if (this.isUserAllowed) {
      this.average$ = this.contratoService.summaryContract();
      return this.isShow = true;
    }
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const { login: { tipo } } = this.jwtHelper.decodeToken(token)._doc;
    const permission = tipo.some(t => t === 'administrador' || t === 'contrato' || t === 'contrato_escrita');
    this.canUserSeeContractTotal = tipo.some(t => t === 'administrador' || t === 'contrato');
    this.isUserAllowed = permission;

    this.contratosSubject$ = new Subject();
    this.contratos$ = this.contratosSubject$
      .flatMap((lazyLoadParams) => {
        const { skip = this.skip, limit = 25 } = lazyLoadParams || {};
        return this.contratoService.contratosLazyLoad(skip, limit, this.defaultSearchQuery);
      })
      .map(({ contratos = [], count }) => {
        this.totalRecords = count;
        this.carregando = false;


        return contratos.map((contrato) => {
          let status = 'ATIVO'
          if (!contrato.ativo){
            status = 'CANCELADO'
          } else if (contrato.isInDebt) {
            status = 'DEBITO'
          }

          return ({
            ...contrato,
            status,
          })
        });
      });

    setTimeout(() => this.contratosSubject$.next({}), 100);

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

  showConfirDeleteModal(contratoID) {
    this.contratoService.getContrato(contratoID)
    .subscribe(res => {
      const referenciaModal = this._servicoModal.open(
        ModalContratoComponent,
        this.opcoesModal
      );
      referenciaModal.componentInstance.contratoSelecionado = res;
    });
  }

  deleteContrato(contratoID) {
    if (!this.isUserAllowed) { return; }

    const modalInstance = this._servicoModal.open(ConfirmationModal);
    modalInstance.componentInstance.message = `Voce deseja realmente excluir o contrato ${contratoID}?`;
    modalInstance
      .result
      .then((isPasswordValid) => {
        if (!isPasswordValid) { return; }

        return this.contratoService.deleteContrato(contratoID)
          .toPromise()
          .then(() => this._notificacaoService.info('Successo', `Contrato ${contratoID} excluido com sucesso`))
          .then(() => this.contratosSubject$.next())
          .then(() => this.getAverange())
          .catch((error) => {
            this._notificacaoService.error('Erro', `Nao foi possivel excluir o contrato ${contratoID}`);
          });
      });
  }

  filterEvents({ filters, first, rows }) {
    const queryFormatter = propNameQuery(filters);
    const newQuery: any = {
      ...queryFormatter('numeroContrato'),
      ...queryFormatter('cliente.nome_razao_social'),
      ...queryFormatter('cliente.cnpj_cpf'),
      ...queryFormatter('tipo'),
    };

    const { status: statusQuery = '' } = <any>queryFormatter('status') || {}
    const status = statusQuery.toUpperCase()

    if (status && status.length > 0) {
      if ('DEBITO'.includes(status)) {
        newQuery['isInDebt'] = true
      } else if ('CANCELADO'.includes(status)) {
        newQuery['ativo'] = false
      } else if('ATIVO') {
        newQuery['ativo'] = true
      }
    }

    console.log(status)

    return newQuery;
  }

  loadContratosLazy(event) {
    const query = this.filterEvents(event);
    if (query['cliente.cnpj_cpf']) {
      query['cliente.cnpj_cpf'] = query['cliente.cnpj_cpf'].replace(/\D+/g, '');
    }
    const skip = event.first;
    const limit = event.rows;

    this.skip = skip;
    this.defaultSearchQuery = query;
    this.contratosSubject$.next({ skip, limit });
  }

  changeColorText(contrato) {
    if (!contrato.ativo) { return 'text-danger'; }

    if(contrato.isInDebt){
      return 'is-in-debt'
    }
  }
}
