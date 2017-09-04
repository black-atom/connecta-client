import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { Subscription } from 'rxjs/Rx';

import { AtendimentoService } from './../../../../shared/services';


@Component({
  selector: 'button-view',
  template: `
<button type="button" class="btn btn-info btn-block"
routerLink="/pages/atendimentos/detalhes/{{ idAtendimento }}"><i class="ion-ios-redo"></i> Detalhes</button>
`,
  styleUrls: ['./../../../../shared/styles/smart-table.component.scss']
})
export class BtnDetalhesAtdComponent implements ViewCell, OnInit {

  public idAtendimento: string;

  @Input()
  value: string | number;

  constructor() {}

  ngOnInit() {
    this.idAtendimento = this.value.toString().toUpperCase();
  }
}

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./../../../../shared/styles/smart-table.component.scss']
})
export class GerenciarComponent implements OnInit, OnDestroy {

  public settings = {
    actions: false,
    noDataMessage: 'Nenhum dado encontrado',
    columns: {
      data_atendimento: {
        title: 'Data',
        type: 'string'
      },
      nome_razao_social: {
        title: 'Razão social/nome',
        type: 'string',
        valuePrepareFunction: (coluna, linha) => {
          return linha.cliente.nome_razao_social;
        }
      },
      cnpj_cpf: {
        title: 'CNPJ/CPF',
        type: 'number',
        valuePrepareFunction: (coluna, linha) => {
          return linha.cliente.cnpj_cpf;
        }
      },
      email: {
        title: 'E-mail',
        type: 'string',
        valuePrepareFunction: (coluna, linha) => {
          return linha.contato.email;
       }
      },
      telefone: {
        title: 'Telefone',
        type: 'string',
        valuePrepareFunction: (coluna, linha) => {
          return linha.contato.telefone;
       }
      },
      cep: {
        title: 'CEP',
        type: 'string',
        valuePrepareFunction: (coluna, linha) => {
            return linha.endereco.cep;
        }
      },
      _id: {
        type: 'custom',
        filter: false,
        renderComponent: BtnDetalhesAtdComponent
      }
    }
  };

  source: LocalDataSource;
  private sub: Subscription;

  constructor(private _atendimentoService: AtendimentoService) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.sub = this._atendimentoService.retornarTodos().subscribe(atendimentos => {
      this.source.load(atendimentos);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
