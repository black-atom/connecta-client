import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EnderecoComponent } from './components/endereco/endereco.component';
import { ContatoComponent } from './components/contato/contato.component';
import { CepService } from './services/cep-service/cep.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    EnderecoComponent,
    ContatoComponent
],
  providers: [
    CepService
  ],
  exports: [
    EnderecoComponent,
    ContatoComponent
  ]
})
export class SharedModule { }
