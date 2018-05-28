import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ProdutoService } from './../../../../shared/services';
import { propNameQuery } from 'app/shared/utils/StringUtils';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./gerenciar.component.scss']
})
export class GerenciarComponent implements OnInit {

  public produtos$: Observable<any[]>;
  public carregando: boolean = true;

  public totalRecords;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.produtos$ = this.produtoService.produtosLazyLoad()
      .map(({ produtos, count }) => {
        this.totalRecords = count;
        this.carregando = false;
        return produtos;
      });
  }

  filterEvents({ filters, first, rows }) {
    const queryFormatter = propNameQuery(filters);
    const newQuery: any = {
      ...queryFormatter('descricao'),
      ...queryFormatter('marca'),
      ...queryFormatter('modelo')
    };
    return newQuery;
  }

  loadProdutosLazy(event) {
    const query = this.filterEvents(event);
    const skip = event.first;
    const limit = event.rows;

    this.produtos$ = this.produtoService
      .produtosLazyLoad(skip, limit, query)
        .map(({ produtos, count }) => {
          this.totalRecords = count;
          this.carregando = false;
          return produtos;
        });
  }

}
