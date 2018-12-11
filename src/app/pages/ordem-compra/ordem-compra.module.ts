import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';

import { ModuloCompartilhado } from './../../shared/shared.module';


import { OrdemCompraComponent } from './ordem-compra.component';
import { NovoComponent } from './components/novo/novo.component';
import { GerenciarComponent } from './components/gerenciar/gerenciar.component';
import { EditarComponent } from './components/editar/editar.component';
import { routing } from './ordem-compra.routing';

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
    OrdemCompraComponent,
    NovoComponent,
    GerenciarComponent,
    EditarComponent
  ],
  providers: [
    ModuloCompartilhado
  ]
})
export class OrdemCompraModule { }
