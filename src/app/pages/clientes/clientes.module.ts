import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgaModule } from '../../theme/nga.module';

import { ClientesComponent } from './clientes.component';
import { NovoClienteComponent } from './components/novo-cliente';
import { GerenciarComponent } from './components/gerenciar';

import { routing } from './clientes.routing';

@NgModule({
  imports: [CommonModule, Ng2SmartTableModule, NgaModule, routing],
  declarations: [ClientesComponent, NovoClienteComponent, GerenciarComponent],
})
export class ClientesModule { }
