import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';

import { ModuloCompartilhado } from './../../shared/shared.module';


import { EstoqueComponent } from './estoque.component';
import { GerenciarComponent } from './components/gerenciar/gerenciar.component';
import { routing } from './estoque.routing';
import { LiberarProdutoComponent } from './components/liberar-produto/liberar-produto.component';

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
    GerenciarComponent,
    LiberarProdutoComponent
  ],
  providers: [
    ModuloCompartilhado
  ]
})
export class EstoqueModule { }
