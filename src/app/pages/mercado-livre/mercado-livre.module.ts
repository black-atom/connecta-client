import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgaModule } from '../../theme/nga.module';

import { NovoComponent } from './components/novo/novo.component';
import { MercadoLivreComponent } from './mercado-livre.component';
import { GerenciarComponent } from './components/gerenciar/gerenciar.component';

import { routing } from './mercado-livre.routing';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing
  ],
  declarations: [
    NovoComponent,
    MercadoLivreComponent,
    GerenciarComponent
  ]
})
export class MercadoLivreModule { }
