import { Routes, RouterModule } from '@angular/router';

import { FuncionariosComponent } from './funcionarios.component';
import { NovoFuncionarioComponent } from './components/novo-funcionario';
import { GerenciarComponent } from './components/gerenciar/gerenciar.component';
import { DetalhesFuncionarioComponent } from './components/detalhes-funcionarios';
import { PerfilComponent } from './components/perfil/perfil.component';
import { FormCanDeactivateGuard } from './../../shared/guards/form-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: FuncionariosComponent,
    children: [
      { path: 'novo', component: NovoFuncionarioComponent,  canDeactivate: [FormCanDeactivateGuard] },
      { path: 'detalhes/:id', component: DetalhesFuncionarioComponent,  canDeactivate: [FormCanDeactivateGuard] },
      { path: 'gerenciar', component: GerenciarComponent },
      { path: 'perfil', component: PerfilComponent, canDeactivate: [FormCanDeactivateGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
