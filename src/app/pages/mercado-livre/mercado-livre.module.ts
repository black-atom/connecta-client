import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuloCompartilhado } from './../../shared/shared.module';

import { NgaModule } from '../../theme/nga.module';

import { NovoComponent } from './components/novo/novo.component';
import { MercadoLivreComponent } from './mercado-livre.component';
import { GerenciarComponent } from './components/gerenciar/gerenciar.component';

import { routing } from './mercado-livre.routing';
import { EditarComponent } from './components/editar/editar.component';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
    ModuloCompartilhado,
    routing
  ],
  declarations: [
    NovoComponent,
    MercadoLivreComponent,
    GerenciarComponent,
    EditarComponent
  ],
  providers: [
    ModuloCompartilhado
  ]
})
export class MercadoLivreModule { }
