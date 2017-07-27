import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { AtendimentosComponent } from './atendimentos.component';
import { NovoAtendimentoComponent } from './components/novo-atendimento';
import { GerenciarComponent } from './components/gerenciar';
import { DetalhesAtendimentoComponent } from './components/detalhes-atendimento';
import { routing } from './atendimentos.routing';
import { InformacoesAtendimentoComponent } from './components/novo-atendimento/informacoes-atendimento';
import { ContatoClienteAtendimentoComponent } from './components/novo-atendimento/contato-cliente-atendimento';
import { DadosClienteAtendimentoComponent } from './components/novo-atendimento/dados-cliente-atendimento';
import { AssociarComponent } from './components/associar/';
import { TecnicosComponent } from './components/associar/tecnicos/tecnicos.component';
import { AtendimentosCadastradosComponent } from './components/associar/atendimentos-cadastrados';

@NgModule({
  imports: [
    CommonModule, 
    NgaModule,
    routing
    ],
  declarations: [
    AtendimentosComponent, 
    NovoAtendimentoComponent, 
    GerenciarComponent, 
    DetalhesAtendimentoComponent, 
    InformacoesAtendimentoComponent,
    ContatoClienteAtendimentoComponent,
    DadosClienteAtendimentoComponent,
    AssociarComponent,
    TecnicosComponent,
    AtendimentosCadastradosComponent
  ],
})
export class AtendimentosModule { }
