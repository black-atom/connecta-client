import { FormCanDeactivateGuard } from './../../shared/guards/form-deactivate.guard';
import { Routes, RouterModule } from '@angular/router';

import { EstoqueComponent } from './estoque.component';
import { NovoComponent } from './components/novo';
import { GerenciarComponent } from './components/gerenciar';
import { EditarComponent } from './components/editar';
const routes: Routes = [
  {
    path: '',
    component: EstoqueComponent,
    children: [
      { path: 'novo', component: NovoComponent },
      { path: 'gerenciar', component: GerenciarComponent },
      { path: 'editar-produto/:id', component: EditarComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
