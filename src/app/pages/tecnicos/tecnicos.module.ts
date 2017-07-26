import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { TecnicosComponent } from './tecnicos.component';
import { NovoTecnicoComponent } from './components/novo-tecnico';
import { GerenciarComponent } from './components/gerenciar';
import { DetalhesTecnicoComponent } from './components/detalhes-tecnico';
import { routing } from './tecnicos.routing';

@NgModule({
  imports: [
    CommonModule,
     NgaModule, 
     Ng2SmartTableModule,
      routing
    ],
  declarations: [
    TecnicosComponent, 
    NovoTecnicoComponent, 
    GerenciarComponent, 
    DetalhesTecnicoComponent
  ],
})
export class TecnicosModule { }
