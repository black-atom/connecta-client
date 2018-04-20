import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModuloCompartilhado } from './../../shared/shared.module';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { TextMaskModule } from 'angular2-text-mask';
import { LightboxModule } from 'angular2-lightbox';
import { FormCanDeactivateGuard } from './../../shared/guards/form-deactivate.guard';

import { AtendimentosComponent } from './atendimentos.component';
import { NovoAtendimentoComponent } from './components/novo-atendimento';
import { GerenciarComponent } from './components/gerenciar';
import { DetalhesAtendimentoComponent } from './components/detalhes-atendimento';
import { AssociarComponent } from './components/associar/';
import { AtendimentosDisponiveisComponent } from './components/associar/atendimentos-disponiveis/';
import { InformacoesAtendimentoComponent } from './components/shared-components/informacoes-atendimento/';
import { routing } from './atendimentos.routing';
import { DadosInteracaoAppComponent } from './components/dados-interacao-app/dados-interacao-app.component';
import { AcaoComponent } from './components/shared-components/acao/acao.component';
import { VisualizacaoModalComponent } from './components/visualizacao-modal/visualizacao-modal.component';
import { AtendimentosConcluidosComponent } from './components/atendimentos-concluidos/atendimentos-concluidos.component';
import {
  AtendimentoConcluidoDetalhesComponent
} from './components/atendimentos-concluidos/atendimento-concluido-detalhes/atendimento-concluido-detalhes.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModuloCompartilhado,
    NgxErrorsModule,
    TextMaskModule,
    LightboxModule,
    routing
  ],
  entryComponents: [
    AtendimentosDisponiveisComponent,
    AtendimentoConcluidoDetalhesComponent,
    VisualizacaoModalComponent
  ],
  declarations: [
    AtendimentosComponent,
    NovoAtendimentoComponent,
    GerenciarComponent,
    DetalhesAtendimentoComponent,
    InformacoesAtendimentoComponent,
    AssociarComponent,
    AtendimentosDisponiveisComponent,
    DadosInteracaoAppComponent,
    AcaoComponent,
    VisualizacaoModalComponent,
    AtendimentosConcluidosComponent,
    AtendimentoConcluidoDetalhesComponent
  ],
  providers: [
    ModuloCompartilhado,
    DatePipe,
    FormCanDeactivateGuard
  ]
})
export class AtendimentosModule { }
