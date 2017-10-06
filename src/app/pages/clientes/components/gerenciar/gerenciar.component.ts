import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { Subscription } from 'rxjs/Rx';

import { ClienteService } from './../../../../shared/services';

@Component({
  selector: 'button-view',
  template: `
<button type="button" class="btn btn-info btn-block"
routerLink="/pages/clientes/detalhes/{{ idCliente }}"><i class="ion-information-circled"></i></button>
`,
  styleUrls: ['./../../../../shared/styles/smart-table.component.scss']

})
export class BtnDetalhesCliComponent implements ViewCell, OnInit {

  public idCliente: string;

  @Input()
  rowData: any;

  @Input() value: string | number;

  constructor() {}

  ngOnInit() {
    this.idCliente = this.value.toString().toUpperCase();
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
    noDataMessage: 'Nenhum cliente encontrado. Tente mais tarde!',
    pager: {
      perPage: 15
    },
    columns: {
      nome_razao_social: {
        title: 'Razão Social/Nome',
        type: 'string'
      },
      cnpj_cpf: {
        title: 'CNPJ/CPF',
        type: 'number',
        valuePrepareFunction: (coluna, linha) => {
          if (linha.cnpj_cpf.length === 14) {
            const cnpj = linha.cnpj_cpf.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, '$1.$2.$3/$4-$5');
            linha.cnpj_cpf = cnpj;
          }else {
            const cpf = linha.cnpj_cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
            linha.cnpj_cpf = cpf;
          }
          return linha.cnpj_cpf;
        }
      },
      contatos: {
        title: 'Telefone',
        valuePrepareFunction: contatos => {
          return contatos[0].telefone;
        }
      },
      _id: {
        type: 'custom',
        filter: false,
        renderComponent: BtnDetalhesCliComponent
      }
    }
  };

  private subscription: Subscription;
  public source: LocalDataSource;

  constructor(private clienteService: ClienteService) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.subscription = this.clienteService.retornarTodos().subscribe(clientes => {
      this.source.load(clientes);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
