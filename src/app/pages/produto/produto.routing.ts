import { FormCanDeactivateGuard } from './../../shared/guards/form-deactivate.guard';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoComponent } from './produto.component';
import { NovoComponent } from './components/novo';
import { GerenciarComponent } from './components/gerenciar';
import { EditarComponent } from './components/editar';
const routes: Routes = [
  {
    path: '',
    component: ProdutoComponent,
    children: [
      { path: 'novo', component: NovoComponent },
      { path: 'gerenciar', component: GerenciarComponent },
      { path: 'editar-produto/:id', component: EditarComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
