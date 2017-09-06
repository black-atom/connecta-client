import { Routes, RouterModule } from '@angular/router';

import { FuncionariosComponent } from './funcionarios.component';
import { NovoFuncionarioComponent } from './components/novo-funcionario';
import { GerenciarComponent } from './components/gerenciar/gerenciar.component';
import { DetalhesFuncionarioComponent } from './components/detalhes-funcionarios';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  {
    path: '',
    component: FuncionariosComponent,
    children: [
      { path: 'novo', component: NovoFuncionarioComponent },
      { path: 'detalhes/:id', component: DetalhesFuncionarioComponent },
      { path: 'gerenciar', component: GerenciarComponent },
      { path: 'perfil', component: PerfilComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
