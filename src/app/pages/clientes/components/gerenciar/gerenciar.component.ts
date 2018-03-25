import { Component, OnInit , OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { propNameQuery } from 'app/shared/utils/StringUtils';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { ClienteService } from './../../../../shared/services';
import { Cliente } from './../../../../models/cliente.interface';
import { ModalClienteComponent } from './../modal-cliente/modal-cliente.component';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html'
})
export class GerenciarComponent implements OnInit, OnDestroy {


  private subscription: Subscription;
  public clientes: Cliente[];
  public totalRecords;
  public carregando: boolean = true;

  constructor(private clienteService: ClienteService, private _servicoModal: NgbModal
  ) {}

  opcoesModal: NgbModalOptions = {
    size: 'lg'
  };

  ngOnInit() {
    this.subscription = this.clienteService.clientesLazyLoad()
    .subscribe(res => {
      this.clientes = res.clientes;
      this.totalRecords = res.count;
      this.carregando = false;
    });
  }

  abrirModalDeDetalhes(clienteSelecionado) {
    this.clienteService
      .retornarUm(clienteSelecionado)
        .subscribe(res => {
          const referenciaModal = this._servicoModal.open(
            ModalClienteComponent,
            this.opcoesModal
          );
          referenciaModal.componentInstance.clienteSelecionado = res;
        });
  }

  filterEvents(query) {
    const queryFormatter = propNameQuery(query.filters);
    const newQuery: any = {
         search: {
          ...queryFormatter('nome_razao_social'),
          ...queryFormatter('cnpj_cpf')
         },
         first : query.first,
         rows : query.rows
    };
    return newQuery;
  }

  loadClientesLazy(event) {

    this.carregando = true;
    const query = this.filterEvents(event);
    if (query.search['cnpj_cpf']) {
      query.search['cnpj_cpf'] = query.search['cnpj_cpf'].replace(/\D+/g, '');
    }
    this.subscription = this.clienteService
      .clientesLazyLoad(query.first, query.rows, query.search)
      .subscribe(res => {
        this.clientes = res.clientes;
        this.totalRecords = res.count;
        this.carregando = false;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
