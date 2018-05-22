import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModuloCompartilhado } from '../../shared/shared.module';
import { routing } from './relatorios.routing';

import { RelatorioTecnicosComponent } from './relatorio-tecnicos/relatorio-tecnicos.component';
import { RelatorioComponent } from './relatorio.component';
import { PrintRelatorioTecnicosComponent } from './relatorio-tecnicos/print-relatorio-tecnicos/print-relatorio-tecnicos.component';
import { SharedModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    ModuloCompartilhado,
    SharedModule,
    FormsModule,
    routing
  ],
  providers: [
    ModuloCompartilhado
  ],
  declarations: [
    RelatorioComponent,
    RelatorioTecnicosComponent,
    PrintRelatorioTecnicosComponent
  ]
})
export class RelatoriosModule { }
