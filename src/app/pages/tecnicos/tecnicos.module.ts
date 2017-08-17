import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';

import { TecnicosComponent } from './tecnicos.component';
import { GerenciarComponent, BtnDetalhesTecComponent } from './components/gerenciar/';
import { NovoTecnicoComponent } from './components/novo-tecnico';
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
    BtnDetalhesTecComponent
  ],
  entryComponents: [
    BtnDetalhesTecComponent
  ],
  providers: [
    CepService,
    TecnicoService
   ]
})
export class TecnicosModule { }
