import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';

import { ModuloCompartilhado } from './../../shared/shared.module';


import { ProdutoComponent } from './produto.component';
import { NovoComponent } from './components/novo/novo.component';
import { GerenciarComponent } from './components/gerenciar/gerenciar.component';
import { EditarComponent } from './components/editar/editar.component';
import { routing } from './produto.routing';
import { ModalImagemComponent } from './components/modal-imagem/modal-imagem.component';

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
    ProdutoComponent,
    NovoComponent,
    GerenciarComponent,
    EditarComponent,
    ModalImagemComponent
  ],
  entryComponents: [
    ModalImagemComponent
  ],
  providers: [
    ModuloCompartilhado,
  ]
})
export class ProdutoModule { }
