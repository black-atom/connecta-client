import { NotificacaoService } from './../../../../shared/services/notificacao-service/notificacao.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { Subscription } from 'rxjs/Rx';

import { DatePipe } from '@angular/common';
import { AtendimentoService } from './../../../../shared/services';


@Component({
  selector: 'button-detalhes-view',
  template: `
  <div class="row">
     <div class="col-md-12">
      <div class="row">

      <div class="col-md-6 col-xs-12">
        <button type="button" class="btn btn-info" title="Edição do atendimento"
        routerLink="/pages/atendimentos/detalhes/{{ idAtendimento }}"><i class="ion-information-circled"></i></button>
      </div>

      <div class="col-md-6 col-xs-12">
        <button type="button" class="btn btn-dados" title="Visualização do atendimento"
        routerLink="/pages/atendimentos/dados-app/{{ idAtendimento }}"><i class="ion-eye"></i></button>
      </div>
    </div>

</div>

`,
  styleUrls: ['./../../../../shared/styles/smart-table.component.scss']
})
export class BtnDetalhesAtdComponent implements ViewCell, OnInit {


  public idAtendimento: string;

  @Input()
  rowData: any;

  @Input()
  value: string | number;


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
    noDataMessage: 'Nenhum atendimento encontrado. Tente mais tarde!',
    pager: {
      perPage: 15
    },
    rowClassFunction: (row) => {
      if (row.data.situacao.status === 'reagendar') {
        return 'reagendamento';
      } else if (row.data.situacao.status === 'cancelar') {
        return 'cancelado';
      } else if (row.data.tipo === 'Aberto por técnica') {
        return 'aberto-por-tecnica ';
      }
    },
    columns: {
      data_atendimento: {
        title: 'Data',
        type: 'string',
        valuePrepareFunction: (date) => {
          const data = new Date(date);
          const novaData = new DatePipe('pt-BR').transform(data, 'dd/MM/yyyy');

          return novaData;
        }
      },
      nome_razao_social: {
        title: 'Empresa',
        type: 'string',
        valuePrepareFunction: (coluna, linha) => {
          return `${linha.cliente.nome_razao_social.slice(0, 17)} .`;
        }
      },
      cnpj_cpf: {
        title: 'CNPJ/CPF',
        type: 'number',
        valuePrepareFunction: (coluna, linha) => {
          if (linha.cliente.cnpj_cpf.length === 14) {
            const cnpj = linha.cliente.cnpj_cpf.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, '$1.$2.$3/$4-$5');
            linha.cliente.cnpj_cpf = cnpj;
          }else {
            const cpf = linha.cliente.cnpj_cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
            linha.cliente.cnpj_cpf = cpf;
          }
          return linha.cliente.cnpj_cpf;
        }
      },
      tecnico: {
        title: 'Técnico',
        type: 'string',
        valuePrepareFunction: (coluna, linha) => {
          return linha.tecnico.nome.split(' ')[0];
       }
      },
      createdBy: {
        title: 'Criado por',
        type: 'string',
        valuePrepareFunction: (coluna, linha) => {
          return linha.createdBy.split(' ')[0];
        }
      },
      imagens: {
        type: 'html',
        filter: false,
        valuePrepareFunction: (cell, row) => {
          if (row.imagens.length > 0) {
          return `<span><i class="fa fa-camera" style="color: red; margin-right: 15px;"></i></span>`;
        }
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

  constructor(private _atendimentoService: AtendimentoService,
              private datePipe: DatePipe,
              private _notificacaoService: NotificacaoService) {
                this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.sub = this._atendimentoService.retornarTodos().subscribe(atendimentos => {
      this.source.load(atendimentos);
      this.source.setSort([{ field: 'data_atendimento', direction: 'desc' }]);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
