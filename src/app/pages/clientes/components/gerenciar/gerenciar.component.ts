import { Component, OnInit, Input } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';

import { ClienteService } from './../../../../shared/services';

@Component({
  selector: 'button-view',
  template: `
<button type="button" class="btn btn-info btn-block"
routerLink="/pages/clientes/detalhes/{{ idCliente }}"><i class="ion-ios-redo"></i> Detalhes</button>
`,
  styleUrls: ['./gerenciar.component.scss']
})
export class BtnDetalhesCliComponent implements ViewCell, OnInit {

  public idCliente: string;

  @Input() value: string | number;

  constructor() {}

  ngOnInit() {
    this.idCliente = this.value.toString().toUpperCase();
  }
}

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./gerenciar.component.scss']
})
export class GerenciarComponent implements OnInit {

  public settings = {
    actions: false,
    noDataMessage: 'Nenhum dado encontrado',
    columns: {
      razao_social: {
        title: 'Razão Social/Nome',
        type: 'string'
      },
      cnpj_cpf: {
        title: 'CNPJ/CPF',
        type: 'number'
      },
      // email: {
      //   title: 'E-mail',
      //   type: 'string'
      // },
      contatos: {
        title: 'Telefone',
        valuePrepareFunction: contatos => {
          return contatos[0].telefone;
        }
      },
      id: {
        type: 'custom',
        filter: false,
        renderComponent: BtnDetalhesCliComponent
      }
    }
  };

  source: LocalDataSource;

  constructor(private clienteService: ClienteService) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.clienteService.retornarTodos().subscribe(clientes => {
      this.source.load(clientes);
    });
  }
}
