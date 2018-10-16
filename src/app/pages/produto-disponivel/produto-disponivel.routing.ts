import { FormCanDeactivateGuard } from './../../shared/guards/form-deactivate.guard';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoDisponivelComponent } from './produto-disponivel.component';
import { NovoComponent } from './components/novo';
import { GerenciarComponent } from './components/gerenciar';
import { EditarComponent } from './components/editar';
const routes: Routes = [
  {
    path: '',
    component: ProdutoDisponivelComponent,
    children: [
      { path: 'novo/:id', component: NovoComponent },
      { path: 'gerenciar', component: GerenciarComponent },
      { path: 'editar-produto-disponivel/:id', component: EditarComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
