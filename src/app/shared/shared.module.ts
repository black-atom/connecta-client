import { LoginService } from './services/login-service/login.service';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgaModule } from '../theme/nga.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { ClienteService } from './services/cliente-service/cliente.service';
import { EnderecoComponent } from './components/endereco/endereco.component';
import { ContatoComponent } from './components/contato/contato.component';
import { PrincipaisInfoComponent } from './components/clientes/principais-info';
import { CepService } from './services/cep-service/cep.service';

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
    ClienteService
  ],
  exports: [
    EnderecoComponent,
    ContatoComponent,
    PrincipaisInfoComponent
  ]
})
export class SharedModule { }
