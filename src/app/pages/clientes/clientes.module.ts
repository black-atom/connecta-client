import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgaModule } from '../../theme/nga.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';

import { ClientesComponent } from './clientes.component';
import { NovoClienteComponent } from './components/novo-cliente';
import { GerenciarComponent, BtnDetalhesCliComponent } from './components/gerenciar';
import { DetalhesClienteComponent } from './components/detalhes-cliente/';
import { CepService } from './../../shared/services/cep-service/cep.service';
import { ClienteService } from './../../shared/services/cliente-service/cliente.service';
import { routing } from './clientes.routing';
import { TesteComponent } from './components/teste/teste.component';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule, 
    NgaModule, 
    routing,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    CepService,
    ClienteService
  ],
  entryComponents: [
    BtnDetalhesCliComponent
  ],
  declarations: [
    ClientesComponent,
    NovoClienteComponent, 
    GerenciarComponent,  
    DetalhesClienteComponent,
    BtnDetalhesCliComponent,
    TesteComponent
  ]
})
export class ClientesModule { }
