import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { AtendimentosComponent } from './atendimentos.component';
import { PerguntasComponent } from './components/perguntas';
import { NovoAtendimentoComponent } from './components/novo-atendimento';
import { GerenciarComponent } from './components/gerenciar';
import { DetalhesAtendimentoComponent } from './components/detalhes-atendimento';
import { routing } from './atendimentos.routing';

@NgModule({
  imports: [
    CommonModule, 
    NgaModule,
     routing
    ],
  declarations: [
    AtendimentosComponent, 
    PerguntasComponent, 
    NovoAtendimentoComponent, 
    GerenciarComponent, 
    DetalhesAtendimentoComponent
  ],
})
export class AtendimentosModule { }
