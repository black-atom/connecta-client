import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OverlayPanel } from 'primeng/components/overlaypanel/overlaypanel';

import { routing } from './../metricas/metricas.routing';
import { MetricasComponent } from './metricas.component';
import { AtendimentosComponent } from './components/atendimentos/atendimentos.component';
import { QuilometragemComponent } from './components/quilometragem/quilometragem.component';
import { ModuloCompartilhado } from 'app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    NgbModule,
    FormsModule,
    ModuloCompartilhado,
    routing
  ],
  declarations: [
      MetricasComponent,
      AtendimentosComponent,
      QuilometragemComponent
    ]
})
export class MetricasModule {}
