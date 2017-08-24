import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { FuncionariosComponent } from './funcionarios.component';
import { GerenciarComponent, BtnDetalhesTecComponent } from './components/gerenciar/';
import { NovoFuncionarioComponent } from './components/novo-funcionario';
import { DetalhesFuncionarioComponent } from './components/detalhes-funcionarios';
import { HabilitacaoComponent } from './components/shared-components/habilitacao/';
import { PrincipaisInformacoesComponent } from './components/shared-components/principais-informacoes/';
import { routing } from './funcionarios.routing';
import { LoginFuncionarioComponent } from './components/shared-components/login-funcionario/login-funcionario.component';

@NgModule({
  imports: [
     CommonModule,
     NgaModule,
     Ng2SmartTableModule,
     ReactiveFormsModule,
     FormsModule,
     SharedModule,
     TextMaskModule,
     NgxErrorsModule,
     routing
    ],
  declarations: [
    FuncionariosComponent,
    NovoFuncionarioComponent,
    GerenciarComponent,
    DetalhesFuncionarioComponent,
    PrincipaisInformacoesComponent,
    HabilitacaoComponent,
    BtnDetalhesTecComponent,
    LoginFuncionarioComponent
  ],
  entryComponents: [
    BtnDetalhesTecComponent
  ],
  providers: [
    SharedModule
   ]
})
export class FuncionariosModule { }
