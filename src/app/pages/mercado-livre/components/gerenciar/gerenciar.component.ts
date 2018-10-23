import { propNameQuery } from 'app/shared/utils/StringUtils';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { MercadoLivreServiceService } from 'app/shared/services';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./gerenciar.component.scss']
})
export class GerenciarComponent implements OnInit {

  public orderSell$: Observable<any[]>;
  public carregando: boolean = true;

  public totalRecords;

  constructor(private mercadoLivreServiceService: MercadoLivreServiceService) { }

  ngOnInit() {
    this.orderSell$ = this.mercadoLivreServiceService.getAllMercadoLivre()
      .map(({ mercadoLivreOrders, count }) => {
        this.totalRecords = count;
        this.carregando = false;
        return mercadoLivreOrders;
      });
  }

  filterEvents({ filters, first, rows }) {
    const queryFormatter = propNameQuery(filters);
    const newQuery: any = {
      ...queryFormatter('dateSell'),
      ...queryFormatter('customerName'),
      ...queryFormatter('Status')
    };
    return newQuery;
  }

  loadorderSellLazy(event) {
    const query = this.filterEvents(event);
    const skip = event.first;
    const limit = event.rows;

    this.orderSell$ = this.mercadoLivreServiceService
      .getAllMercadoLivre(skip, limit, query)
      .map(({ mercadoLivreOrders, count }) => {
        this.totalRecords = count;
        this.carregando = false;
        return mercadoLivreOrders;
      });
  }
}
