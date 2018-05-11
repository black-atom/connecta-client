import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModuloCompartilhado } from '../../shared/shared.module';
import { routing } from './relatorios.routing';

import { RelatorioTecnicosComponent } from './relatorio-tecnicos/relatorio-tecnicos.component';
import { RelatorioComponent } from './relatorio.component';

@NgModule({
  imports: [
    CommonModule,
    ModuloCompartilhado,
    FormsModule,
    routing
  ],
  providers: [
    ModuloCompartilhado
  ],
  declarations: [
    RelatorioComponent,
    RelatorioTecnicosComponent
  ]
})
export class RelatoriosModule { }
