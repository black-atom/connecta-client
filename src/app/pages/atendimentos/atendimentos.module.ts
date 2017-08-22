import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { AtendimentosComponent } from './atendimentos.component';
import { NovoAtendimentoComponent } from './components/novo-atendimento';
import { GerenciarComponent } from './components/gerenciar';
import { DetalhesAtendimentoComponent } from './components/detalhes-atendimento';
import { AssociarComponent } from './components/associar/';
import { AtendimentosDisponiveisComponent } from './components/associar/atendimentos-disponiveis/';
import { InformacoesAtendimentoComponent } from './components/shared-components/informacoes-atendimento/';
import { routing } from './atendimentos.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxErrorsModule,
    routing
  ],
  entryComponents: [
    AtendimentosDisponiveisComponent
  ],
  declarations: [
    AtendimentosComponent,
    NovoAtendimentoComponent,
    GerenciarComponent,
    DetalhesAtendimentoComponent,
    InformacoesAtendimentoComponent,
    AssociarComponent,
    AtendimentosDisponiveisComponent
  ],
  providers: [
    SharedModule
  ]
})
export class AtendimentosModule { }
