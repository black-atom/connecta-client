import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { routing } from './monitoramento.routing';
import { MonitoramentoComponent } from './monitoramento.component';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing
  ],
  declarations: [MonitoramentoComponent]
})
export class MonitoramentoModule {}
