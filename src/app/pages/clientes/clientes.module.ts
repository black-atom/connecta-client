import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesComponent } from './clientes.component';
import { NovoClienteComponent } from './components/novo-cliente';
import { GerenciarComponent } from './components/gerenciar';

import { routing } from './clientes.routing';

@NgModule({
  imports: [CommonModule, routing],
  declarations: [ClientesComponent, NovoClienteComponent, GerenciarComponent],
})
export class ClientesModule { }
