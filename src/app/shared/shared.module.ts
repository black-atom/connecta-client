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

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token'
  }), http, options);
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    SimpleNotificationsModule,
    TextMaskModule,
    NgxErrorsModule
  ],
  declarations: [
    EnderecoComponent,
    ContatoComponent,
    PrincipaisInfoComponent
],
  providers: [
    CepService,
    LoginService,
    ClienteService,
    FuncionarioService,
    AtendimentoService,
    NotificacaoService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  exports: [
    EnderecoComponent,
    ContatoComponent,
    PrincipaisInfoComponent
   ]
})
export class SharedModule { }
