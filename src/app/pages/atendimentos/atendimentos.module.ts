import { environment } from './../../../environments/environment';
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
import { AtendimentoDetailComponent } from './components/atendimentos-concluidos/atendimento-concluido-detalhes/atendimento-detail/atendimento-detail.component';
import { RelatorioTecnicoDetailComponent } from './components/atendimentos-concluidos/atendimento-concluido-detalhes/relatorio-tecnico-detail/relatorio-tecnico-detail.component';
import { FotosAtendimentoComponent } from './components/atendimentos-concluidos/atendimento-concluido-detalhes/fotos-atendimento/fotos-atendimento.component';
import { FaturamentoComponent } from './components/atendimentos-concluidos/atendimento-concluido-detalhes/faturamento/faturamento.component';
import { AssinaturaComponent } from './components/atendimentos-concluidos/atendimento-concluido-detalhes/assinatura/assinatura.component';
import { AtendimentoPrintComponent } from './components/atendimentos-concluidos/atendimento-print/atendimento-print.component';
import { DesbloquearModalComponent } from './components/desbloquear-modal/desbloquear-modal.component';
import { ModalAlertComponent } from './components/modal-alert/modal-alert.component';
import { AssociarMapComponent } from './components/associar-map';
import { AgmCoreModule } from '@agm/core';
import { AssociarProdutosComponent } from './components/associar-produtos/associar-produtos.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModuloCompartilhado,
    NgxErrorsModule,
    TextMaskModule,
    LightboxModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY
    })
  ],
  entryComponents: [
    AtendimentosDisponiveisComponent,
    AtendimentoConcluidoDetalhesComponent,
    VisualizacaoModalComponent,
    DesbloquearModalComponent,
    ModalAlertComponent,
    AssociarProdutosComponent
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
    AtendimentoConcluidoDetalhesComponent,
    AtendimentoDetailComponent,
    RelatorioTecnicoDetailComponent,
    FotosAtendimentoComponent,
    FaturamentoComponent,
    AssinaturaComponent,
    AtendimentoPrintComponent,
    DesbloquearModalComponent,
    ModalAlertComponent,
    AssociarMapComponent,
    AssociarProdutosComponent
  ],
  providers: [
    ModuloCompartilhado,
    DatePipe,
    FormCanDeactivateGuard
  ]
})
export class AtendimentosModule { }
