import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { propNameQuery, formatQuery } from 'app/shared/utils/StringUtils';
import { EstoqueService } from './../../../../shared/services/';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./gerenciar.component.scss']
})
export class GerenciarComponent implements OnInit {

  public stockTransactions$: Observable<any[]>;
  public carregando: boolean = true;

  public totalRecords;

  constructor(private estoqueService: EstoqueService) { }

  ngOnInit() {
    this.stockTransactions$ = this.estoqueService.getAllTransactionsStock()
      .map(({ stockTransactions, count }) => {
        this.totalRecords = count;
        this.carregando = false;
        return stockTransactions;
      });
  }

  filterEvents({ filters, first, rows }) {
    const queryFormatter = propNameQuery(filters);
    const newQuery: any = {
      ...queryFormatter('createdAt'),
      ...queryFormatter('description'),
      ...queryFormatter('createdBy'),
      ...queryFormatter('status')
    };
    return newQuery;
  }

  loadProdutosLazy(event) {
    // const query = formatQuery('createdAt')(this.filterEvents(event));

    // const skip = event.first;
    // const limit = event.rows;

    // this.orderBuys$ = this.ordemCompraService
    //   .produtosLazyLoad(skip, limit, query)
    //     .map(({ orderBuys, count }) => {
    //       this.totalRecords = count;
    //       this.carregando = false;
    //       return orderBuys;
    //     });
  }

}
