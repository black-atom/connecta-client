import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModuloCompartilhado } from './../../shared/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { FuncionariosComponent } from './funcionarios.component';
import { GerenciarComponent } from './components/gerenciar';
import { NovoFuncionarioComponent } from './components/novo-funcionario';
import { DetalhesFuncionarioComponent } from './components/detalhes-funcionarios';
import { HabilitacaoComponent } from './components/shared-components/habilitacao';
import { PrincipaisInformacoesComponent } from './components/shared-components/principais-informacoes';
import { LoginFuncionarioComponent } from './components/shared-components/login-funcionario/';
import { routing } from './funcionarios.routing';
import { PerfilComponent } from './components/perfil';
import { FormCanDeactivateGuard } from './../../shared/guards/form-deactivate.guard';

@NgModule({
  imports: [
     CommonModule,
     NgaModule,
     ReactiveFormsModule,
     FormsModule,
     ModuloCompartilhado,
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
    LoginFuncionarioComponent,
    PerfilComponent
  ],
  providers: [
    ModuloCompartilhado,
    FormCanDeactivateGuard
   ],
   exports: [
    PrincipaisInformacoesComponent,
    HabilitacaoComponent,
    LoginFuncionarioComponent
   ]
})
export class FuncionariosModule { }
