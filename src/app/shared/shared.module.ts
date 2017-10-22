
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgaModule } from '../theme/nga.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxErrorsModule } from '@ultimate/ngxerrors';


import { FuncionarioService } from './services';
import { ClienteService } from './services';
import { EnderecoComponent } from './components/endereco';
import { ContatoComponent } from './components/contato';
import { PrincipaisInfoComponent } from './components/clientes/principais-info';
import { CepService } from './services';
import { LoginService } from './services';
import { AtendimentoService } from './services';
import { NotificacaoService } from './services';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { CustomNgbDateParserFormatter } from './custom-ngbdateparserformatter';
import { CustomDatepickerI18n, I18n } from './custom-ngbdate-i18n';
import { NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { DataTableModule, SharedModule, ButtonModule } from 'primeng/primeng';
import { CnpjCpfPipe } from './pipes/cnpj-cpf.pipe';
import { SplitPipe } from './pipes/split.pipe';
import { CepPipe } from './pipes/cep.pipe';

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
    SimpleNotificationsModule,
    TextMaskModule,
    NgxErrorsModule,
    DataTableModule,
    ButtonModule,
    SharedModule
  ],
  declarations: [
    EnderecoComponent,
    ContatoComponent,
    PrincipaisInfoComponent,
    CnpjCpfPipe,
    SplitPipe,
    CepPipe
  ],
  providers: [
    CepService,
    LoginService,
    ClienteService,
    FuncionarioService,
    AtendimentoService,
    NotificacaoService,
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
  exports: [
    EnderecoComponent,
    ContatoComponent,
    PrincipaisInfoComponent,
    CnpjCpfPipe,
    SplitPipe,
    CepPipe,
    DataTableModule,
    ButtonModule,
    SharedModule
   ]
})
export class ModuloCompartilhado { }
