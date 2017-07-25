import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtendimentosComponent } from './atendimentos.component';
import { PerguntasComponent } from './components/perguntas';
import { NovoAtendimentoComponent } from './components/novo-atendimento';
import { GerenciarComponent } from './components/gerenciar';

import { routing } from './atendimentos.routing';

@NgModule({
  imports: [CommonModule, routing],
  declarations: [AtendimentosComponent, PerguntasComponent, NovoAtendimentoComponent, GerenciarComponent],
})
export class AtendimentosModule { }
