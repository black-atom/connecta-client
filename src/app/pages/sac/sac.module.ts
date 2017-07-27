import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgaModule } from '../../theme/nga.module';

import { SacComponent } from './sac.component';
import { ConsultaComponent } from './components/consulta/consulta.component';

import { routing } from './sac.routing';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [SacComponent, ConsultaComponent]
})
export class SacModule { }
