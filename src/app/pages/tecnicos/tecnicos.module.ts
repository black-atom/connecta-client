import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TecnicosComponent } from './tecnicos.component';
import { NovoTecnicoComponent } from './components/novo-tecnico';
import { GerenciarComponent } from './components/gerenciar';

import { routing } from './tecnicos.routing';

@NgModule({
  imports: [CommonModule, routing],
  declarations: [TecnicosComponent, NovoTecnicoComponent, GerenciarComponent],
})
export class TecnicosModule { }
