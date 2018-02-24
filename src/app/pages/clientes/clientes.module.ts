import { FormCanDeactivateGuard } from './../../shared/guards/form-deactivate.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModuloCompartilhado } from './../../shared/shared.module';

import { ClientesComponent } from './clientes.component';
import { NovoClienteComponent } from './components/novo-cliente';
import { GerenciarComponent } from './components/gerenciar';
import { DetalhesClienteComponent } from './components/detalhes-cliente/';
import { routing } from './clientes.routing';
import { ModalClienteComponent } from './components/modal-cliente/modal-cliente.component';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing,
    ReactiveFormsModule,
    ModuloCompartilhado,
    FormsModule
  ],
  entryComponents: [
    ModalClienteComponent,
  ],
  providers: [
    ModuloCompartilhado,
    FormCanDeactivateGuard
  ],
  declarations: [
    ClientesComponent,
    NovoClienteComponent,
    GerenciarComponent,
    DetalhesClienteComponent,
    ModalClienteComponent,
  ]
})
export class ClientesModule { }
