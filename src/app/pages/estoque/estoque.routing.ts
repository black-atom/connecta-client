import { FormCanDeactivateGuard } from './../../shared/guards/form-deactivate.guard';
import { Routes, RouterModule } from '@angular/router';

import { EstoqueComponent } from './estoque.component';
import { GerenciarComponent } from './components/gerenciar';

const routes: Routes = [
  {
    path: '',
    component: EstoqueComponent,
    children: [
      { path: 'gerenciar', component: GerenciarComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
