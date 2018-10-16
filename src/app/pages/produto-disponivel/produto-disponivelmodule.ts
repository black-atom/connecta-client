import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';

import { ModuloCompartilhado } from './../../shared/shared.module';


import { ProdutoDisponivelComponent } from './produto-disponivel.component';
import { NovoComponent } from './components/novo/novo.component';
import { GerenciarComponent } from './components/gerenciar/gerenciar.component';
import { EditarComponent } from './components/editar/editar.component';
import { routing } from './produto-disponivel.routing';

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
    ProdutoDisponivelComponent,
    NovoComponent,
    GerenciarComponent,
    EditarComponent
  ],
  providers: [
    ModuloCompartilhado
  ]
})
export class ProdutoDisponivelModule { }
