import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SacComponent } from './sac.component';
import { ConsultaComponent } from './components/consulta/consulta.component';

import { routing } from './sac.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [SacComponent, ConsultaComponent]
})
export class SacModule { }
