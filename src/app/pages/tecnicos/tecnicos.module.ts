import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TecnicosComponent } from './tecnicos.component';
import { NovoTecnicoComponent } from './components/novo-tecnico';
import { GerenciarComponent } from './components/gerenciar';
import { DetalhesTecnicoComponent } from './components/detalhes-tecnico';
import { CepService } from './../../shared/services/cep-service/';
import { TecnicoService } from './../../shared/services/tecnico-service/';
import { routing } from './tecnicos.routing';
import { PrincipaisInformacoesComponent } from './components/novo-tecnico/principais-informacoes/';
import { EnderecoComponent } from './components/novo-tecnico/endereco/';
import { HabilitacaoComponent } from './components/novo-tecnico/habilitacao/';

@NgModule({
  imports: [
     CommonModule,
     NgaModule,
     Ng2SmartTableModule,
     ReactiveFormsModule,
     FormsModule,
     routing
    ],
  declarations: [
    TecnicosComponent,
    NovoTecnicoComponent,
    GerenciarComponent,
    DetalhesTecnicoComponent,
    PrincipaisInformacoesComponent,
    EnderecoComponent,
    HabilitacaoComponent
  ],
  providers: [
    CepService,
    TecnicoService
  ]
})
export class TecnicosModule { }
