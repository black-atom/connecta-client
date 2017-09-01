import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { routing } from './../metricas/metricas.routing';
import { MetricasComponent } from './metricas.component';
import { AtendimentosComponent } from './components/atendimentos/atendimentos.component';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing
  ],
  declarations: [
      MetricasComponent,
      AtendimentosComponent
    ]
})
export class MetricasModule {}
