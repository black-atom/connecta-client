import { FormCanDeactivateGuard } from './../../shared/guards/form-deactivate.guard';
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
      { path: 'novo', component: NovoClienteComponent , canDeactivate: [FormCanDeactivateGuard] },
      { path: 'gerenciar', component: GerenciarComponent },
      { path: 'detalhes/:id', component: DetalhesClienteComponent, canDeactivate: [FormCanDeactivateGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
