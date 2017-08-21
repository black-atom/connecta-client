import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgaModule } from '../theme/nga.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { TecnicoService } from './services/tecnico-service';
import { ClienteService } from './services/cliente-service';
import { EnderecoComponent } from './components/endereco';
import { ContatoComponent } from './components/contato';
import { PrincipaisInfoComponent } from './components/clientes/principais-info';
import { CepService } from './services/cep-service';
import { LoginService } from './services/login-service/login.service';


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
    TecnicoService
  ],
  exports: [
    EnderecoComponent,
    ContatoComponent,
    PrincipaisInfoComponent
  ]
})
export class SharedModule { }
