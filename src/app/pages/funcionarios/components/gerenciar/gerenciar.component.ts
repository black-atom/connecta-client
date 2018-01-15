import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { propNameQuery } from 'app/shared/utils/StringUtils';
import { FuncionarioService } from './../../../../shared/services';
import { Funcionario } from './../../../../models';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html'
})
export class GerenciarComponent implements OnInit, OnDestroy {

  public funcionarios: Funcionario[];
  public totalRecords;
  public carregando: boolean = true;

  private subscription: Subscription;

  constructor(private _funcionarioService: FuncionarioService) {}

  ngOnInit() {
    this.subscription = this._funcionarioService.funcionariosLazyLoad()
    .subscribe(res => {
      this.funcionarios = res.funcionarios;
      this.totalRecords = res.count;
      this.carregando = false;
    });
  }

  mudarEstiloLinha(dadosLinha: Funcionario) {
    return 'padrao';
  }

  filterEvents(query) {
    const queryFormatter = propNameQuery(query.filters);
    const newQuery: any = {
         search: {
          ...queryFormatter('nome'),
          ...queryFormatter('cpf'),
          ...queryFormatter('rg'),
          ...queryFormatter('celular')
         },
         first : query.first,
         rows : query.rows
    };
    return newQuery;
  }

  loadFuncionariosLazy(event) {

    this.carregando = true;
    const query = this.filterEvents(event);
    if (query.search['cpf']) {
      query.search['cpf'] = query.search['cpf'].replace(/\D+/g, '');
    }
    if (query.search['rg']) {
      query.search['rg'] = query.search['rg'].replace(/\D+/g, '');
    }
    this.subscription = this._funcionarioService
      .funcionariosLazyLoad(query.first, query.rows, query.search)
      .subscribe(res => {
        this.funcionarios = res.funcionarios;
        this.totalRecords = res.count;
        this.carregando = false;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

