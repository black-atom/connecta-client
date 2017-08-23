import { Component, OnInit, Input } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';

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
      email: {
        title: 'E-mail',
        type: 'string'
      },
      telefone: {
        title: 'Telefone',
        type: 'string'
      },
        cep: {
          title: 'CEP',
          type: 'string'
      },
      id: {
        type: 'custom',
        filter: false,
        renderComponent: BtnDetalhesAtdComponent
      }
    }
  };

  source: LocalDataSource;
  constructor(private _atendimentoService: AtendimentoService) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this._atendimentoService.retornarTodos().subscribe(atendimentos => {
      this.source.load(atendimentos);
    });
  }

}
