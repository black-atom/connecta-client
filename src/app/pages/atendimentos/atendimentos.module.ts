import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { DragulaModule } from '../../../../node_modules/ng2-dragula/ng2-dragula';

import { AtendimentosComponent } from './atendimentos.component';
import { NovoAtendimentoComponent } from './components/novo-atendimento';
import { GerenciarComponent } from './components/gerenciar';
import { DetalhesAtendimentoComponent } from './components/detalhes-atendimento';
import { routing } from './atendimentos.routing';
import { InformacoesAtendimentoComponent } from './components/novo-atendimento/informacoes-atendimento';
import { ContatoClienteAtendimentoComponent } from './components/novo-atendimento/contato-cliente-atendimento';
import { DadosClienteAtendimentoComponent } from './components/novo-atendimento/dados-cliente-atendimento';
import { AssociarComponent } from './components/associar/';
import { EnderecoClienteAtendimentoComponent } from './components/novo-atendimento/endereco-cliente-atendimento';
import { AtendimentosDisponiveisComponent } from './components/associar/atendimentos-disponiveis';

@NgModule({
  imports: [
    CommonModule, 
    NgaModule,
    routing,
    DragulaModule
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
    EnderecoClienteAtendimentoComponent,
    AtendimentosDisponiveisComponent
  ],
})
export class AtendimentosModule { }
