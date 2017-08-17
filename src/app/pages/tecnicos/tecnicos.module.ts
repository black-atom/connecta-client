import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';

import { TecnicosComponent } from './tecnicos.component';
import { BotaoDetalhesComponent } from './../clientes/components/gerenciar';
import { NovoTecnicoComponent } from './components/novo-tecnico';
import { GerenciarComponent } from './components/gerenciar';
import { DetalhesTecnicoComponent } from './components/detalhes-tecnico';
import { CepService } from './../../shared/services/cep-service/';
import { TecnicoService } from './../../shared/services/tecnico-service/';
import { HabilitacaoComponent } from './components/shared-components/habilitacao/';
import { PrincipaisInformacoesComponent } from './components/shared-components/principais-informacoes/';
import { routing } from './tecnicos.routing';

@NgModule({
  imports: [
     CommonModule,
     NgaModule,
     Ng2SmartTableModule,
     ReactiveFormsModule,
     FormsModule,
     SharedModule,
     routing
    ],
  declarations: [
    TecnicosComponent,
    NovoTecnicoComponent,
    GerenciarComponent,
    DetalhesTecnicoComponent,
    PrincipaisInformacoesComponent,
    HabilitacaoComponent,
    BotaoDetalhesComponent
  ],
  entryComponents: [
    BotaoDetalhesComponent
  ],
  providers: [
    CepService,
    TecnicoService,
    BotaoDetalhesComponent
  ]
})
export class TecnicosModule { }
