import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgaModule } from '../../theme/nga.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ClientesComponent } from './clientes.component';
import { NovoClienteComponent } from './components/novo-cliente';
import { GerenciarComponent, BotaoDetalhesComponent } from './components/gerenciar';
import { EnderecoComponent } from './components/novo-cliente/endereco';
import { ContatoComponent } from './components/novo-cliente/contato';
import { DetalhesClienteComponent } from './components/detalhes-cliente/';
import { CepService } from './../../shared/services/cep-service/cep.service';
import { ClienteService } from './../../shared/services/cliente-service/cliente.service';
import { routing } from './clientes.routing';
import { PrincipaisInformacoesComponent } from './components/novo-cliente/principais-informacoes/';


@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule, 
    NgaModule, 
    routing,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    CepService,
    ClienteService
  ],
  entryComponents: [
    BotaoDetalhesComponent
  ],
  declarations: [
    ClientesComponent,
    NovoClienteComponent, 
    GerenciarComponent, 
    EnderecoComponent, 
    ContatoComponent, 
    DetalhesClienteComponent, 
    PrincipaisInformacoesComponent,
    BotaoDetalhesComponent
  ]
})
export class ClientesModule { }
