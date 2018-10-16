import { FormCanDeactivateGuard } from './../../shared/guards/form-deactivate.guard';
import { Routes, RouterModule } from '@angular/router';

import { EstoqueComponent } from './estoque.component';
import { GerenciarComponent } from './components/gerenciar';
import { LiberarProdutoComponent } from './components/liberar-produto/liberar-produto.component';

const routes: Routes = [
  {
    path: '',
    component: EstoqueComponent,
    children: [
      { path: 'gerenciar', component: GerenciarComponent },
      { path: 'liberar-produto', component: LiberarProdutoComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
