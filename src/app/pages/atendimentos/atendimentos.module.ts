import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AtendimentosComponent } from './atendimentos.component';
import { NovoAtendimentoComponent } from './components/novo-atendimento';
import { GerenciarComponent } from './components/gerenciar';
import { DetalhesAtendimentoComponent } from './components/detalhes-atendimento';
import { InformacoesAtendimentoComponent } from './components/novo-atendimento/informacoes-atendimento';
import { ContatoClienteAtendimentoComponent } from './components/novo-atendimento/contato-cliente-atendimento';
import { DadosClienteAtendimentoComponent } from './components/novo-atendimento/dados-cliente-atendimento';
import { AssociarComponent } from './components/associar/';
import { EnderecoClienteAtendimentoComponent } from './components/novo-atendimento/endereco-cliente-atendimento';
import { AtendimentosDisponiveisComponent } from './components/associar/atendimentos-disponiveis/';
import { CepService } from './../../shared/services/cep-service/cep.service';
import { routing } from './atendimentos.routing';


@NgModule({
  imports: [
    CommonModule, 
    NgaModule,
    NgbModule,
    SimpleNotificationsModule,
    ReactiveFormsModule,
    FormsModule,
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
    ContatoClienteAtendimentoComponent,
    DadosClienteAtendimentoComponent,
    AssociarComponent,
    EnderecoClienteAtendimentoComponent,
    AtendimentosDisponiveisComponent
  ],
  providers: [
    CepService
  ]
})
export class AtendimentosModule { }
