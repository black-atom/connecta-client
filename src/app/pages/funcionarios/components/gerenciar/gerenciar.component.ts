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
  private query = { skip: 0, limit: 25 };

  constructor(private _funcionarioService: FuncionarioService) {}

  ngOnInit() {
    this.subscription = this._funcionarioService.funcionariosLazyLoad(this.query)
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
          ...queryFormatter('nome'),
          ...queryFormatter('cpf'),
          ...queryFormatter('rg'),
          ...queryFormatter('celular'),
             skip : query.first,
             limit : query.rows
    };
    return newQuery;
  }

  loadFuncionariosLazy(event) {

    this.carregando = true;
    const query = this.filterEvents(event);

    if (query['cpf']) {
      query['cpf'] = query['cpf'].replace(/\D+/g, '');
    }
    if (query['rg']) {
      query['rg'] = query['rg'].replace(/\D+/g, '');
    }
    this.subscription = this._funcionarioService
      .funcionariosLazyLoad(query)
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

