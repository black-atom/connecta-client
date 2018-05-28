import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';

import { ModuloCompartilhado } from './../../shared/shared.module';


import { EstoqueComponent } from './estoque.component';
import { NovoComponent } from './components/novo/novo.component';
import { GerenciarComponent } from './components/gerenciar/gerenciar.component';
import { EditarComponent } from './components/editar/editar.component';
import { routing } from './estoque.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    ModuloCompartilhado,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    EstoqueComponent,
    NovoComponent,
    GerenciarComponent,
    EditarComponent
  ],
  providers: [
    ModuloCompartilhado,
  ]
})
export class EstoqueModule { }
