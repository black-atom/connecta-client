import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { propNameQuery } from 'app/shared/utils/StringUtils';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContratoService } from './../../../../shared/services/contrato-service/contrato.service';
import { ModalContratoComponent } from './../modal-contrato/modal-contrato.component';

@Component({
  selector: 'app-gerenciar-contrato',
  templateUrl: './gerenciar-contrato.component.html',
  styleUrls: ['./gerenciar-contrato.component.scss']
})
export class GerenciarContratoComponent implements OnInit {

  public contratos$: Observable<any[]>;
  public carregando: boolean = true;

  public totalRecords;

  private opcoesModal: NgbModalOptions = {
    size: 'lg'
  };

  constructor(
    private contratoService: ContratoService,
    private _servicoModal: NgbModal
  ) { }

  ngOnInit() {
    this.contratos$ = this.contratoService.contratosLazyLoad()
      .map(({ produtos, count }) => {
        this.totalRecords = count;
        this.carregando = false;
        return produtos;
      });
  }

  abrirModalDeDetalhes(contratoID) {
    this.contratoService
      .getContrato(contratoID)
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
      ...queryFormatter('cliente.nome_razao_social'),
      ...queryFormatter('cliente.cnpj_cpf'),
      ...queryFormatter('tipo')
    };
    return newQuery;
  }

  loadContratosLazy(event) {
    const query = this.filterEvents(event);
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

}
