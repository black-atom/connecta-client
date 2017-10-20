import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { SacComponent } from './sac.component';
import { ConsultaComponent } from './components/consulta/consulta.component';

import { routing } from './sac.routing';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing
  ],
  declarations: [SacComponent, ConsultaComponent]
})
export class SacModule { }
