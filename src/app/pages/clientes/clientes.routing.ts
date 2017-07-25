import { Routes, RouterModule } from '@angular/router';

import { ClientesComponent } from './clientes.component';
import { NovoClienteComponent } from './components/novo-cliente';
import { GerenciarComponent } from './components/gerenciar';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
    children: [
      { path: 'novo', component: NovoClienteComponent },
      { path: 'gerenciar', component: GerenciarComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
