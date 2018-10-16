import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { propNameQuery, formatQuery } from 'app/shared/utils/StringUtils';
import { ProdutoDisponivelService } from './../../../../shared/services/';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./gerenciar.component.scss']
})
export class GerenciarComponent implements OnInit {

  public productsAvailables$: Observable<any[]>;
  public carregando: boolean = true;

  public totalRecords;

  constructor(private produtoDisponivelService: ProdutoDisponivelService) { }

  ngOnInit() {
    this.productsAvailables$ = this.produtoDisponivelService.getProdutosAvailables()
      .map(({ productsAvaiables, count }) => {
        this.totalRecords = count;
        this.carregando = false;
        return productsAvaiables;
      });
  }

  filterEvents({ filters, first, rows }) {
    const queryFormatter = propNameQuery(filters);
    const newQuery: any = {
      ...queryFormatter('createdAt'),
      ...queryFormatter('description'),
      ...queryFormatter('baseStock'),
      ...queryFormatter('serialNumber'),
      ...queryFormatter('status')
    };
    return newQuery;
  }

  loadProdutosLazy(event) {
    const query = formatQuery('createdAt')(this.filterEvents(event));

    const skip = event.first;
    const limit = event.rows;

    this.productsAvailables$ = this.produtoDisponivelService
      .getProdutosAvailables(skip, limit, query)
        .map(({ productsAvaiables, count }) => {
          this.totalRecords = count;
          this.carregando = false;
          return productsAvaiables;
        });
  }

}
