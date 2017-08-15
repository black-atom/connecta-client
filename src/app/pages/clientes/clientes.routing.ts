import { Routes, RouterModule } from '@angular/router';

import { ClientesComponent } from './clientes.component';
import { NovoClienteComponent } from './components/novo-cliente';
import { GerenciarComponent } from './components/gerenciar';
import { DetalhesClienteComponent } from './components/detalhes-cliente/detalhes-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
    children: [
      { path: 'novo', component: NovoClienteComponent },
      { path: 'gerenciar', component: GerenciarComponent },
      { path: 'detalhes/:id', component: DetalhesClienteComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
