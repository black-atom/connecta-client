import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';

import { AtendimentosComponent } from './atendimentos.component';
import { NovoAtendimentoComponent } from './components/novo-atendimento';
import { GerenciarComponent } from './components/gerenciar';
import { DetalhesAtendimentoComponent } from './components/detalhes-atendimento';
import { AssociarComponent } from './components/associar/';
import { AtendimentosDisponiveisComponent } from './components/associar/atendimentos-disponiveis/';
import { InformacoesAtendimentoComponent } from './components/shared-components/informacoes-atendimento/';
import { CepService } from './../../shared/services/cep-service/cep.service';
import { TecnicoService } from './../../shared/services/tecnico-service/';
import { AtendimentoService } from './../../shared/services/atendimento-service';
import { ClienteService } from './../../shared/services/cliente-service';
import { routing } from './atendimentos.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
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
    CepService,
    TecnicoService,
    AtendimentoService,
    ClienteService
  ]
})
export class AtendimentosModule { }
