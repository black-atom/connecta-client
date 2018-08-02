import { Http, HttpModule, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgaModule } from '../theme/nga.module';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  AtividadeService,
  AtendimentoService,
  FuncionarioService,
  ClienteService,
  CepService,
  LoginService,
  NotificacaoService,
  MonitoramentoService,
  AvaliacoesService,
  ProdutoService,
  ContratoService
} from './services';


import { EnderecoComponent } from './components/endereco';
import { ContatoComponent } from './components/contato';
import { PrincipaisInfoComponent } from './components/clientes/principais-info';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { CustomNgbDateParserFormatter } from './custom-ngbdateparserformatter';
import { CustomDatepickerI18n, I18n } from './custom-ngbdate-i18n';
import { NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { DataTableModule, SharedModule, ButtonModule, TreeTableModule } from 'primeng/primeng';
import { CnpjCpfPipe } from './pipes/cnpj-cpf.pipe';
import { SplitPipe } from './pipes/split.pipe';
import { CepPipe } from './pipes/cep.pipe';
import { ConfirmationModal } from './components/confirmation-modal/confirmation-modal.component';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token'
  }), http, options);
}

export function formatacaoDaData () {
  return new CustomNgbDateParserFormatter('dd/MM/yyyy');
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    NgbModule,
    TextMaskModule,
    NgxErrorsModule,
    DataTableModule,
    TreeTableModule,
    ButtonModule,
    SharedModule
  ],
  declarations: [
    EnderecoComponent,
    ContatoComponent,
    PrincipaisInfoComponent,
    CnpjCpfPipe,
    SplitPipe,
    CepPipe,
    ConfirmationModal
  ],
  providers: [
    AtividadeService,
    CepService,
    LoginService,
    ClienteService,
    FuncionarioService,
    ContratoService,
    AtendimentoService,
    NotificacaoService,
    MonitoramentoService,
    AvaliacoesService,
    ProdutoService,
    I18n,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    {
      provide: NgbDateParserFormatter,
      useFactory: formatacaoDaData
    },
    {
      provide: NgbDatepickerI18n,
      useClass: CustomDatepickerI18n
    }
  ],
  entryComponents: [
    ConfirmationModal
  ],
  exports: [
    ConfirmationModal,
    EnderecoComponent,
    ContatoComponent,
    PrincipaisInfoComponent,
    CnpjCpfPipe,
    SplitPipe,
    CepPipe,
    DataTableModule,
    TreeTableModule,
    ButtonModule,
    NgaModule,
    NgbModule,
    SharedModule
   ]
})
export class ModuloCompartilhado { }
