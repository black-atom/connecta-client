import { Routes, RouterModule } from '@angular/router';

import { TecnicosComponent } from './tecnicos.component';
import { NovoTecnicoComponent } from './components/novo-tecnico';
import { GerenciarComponent } from './components/gerenciar/gerenciar.component';
import { DetalhesTecnicoComponent } from './components/detalhes-tecnico/detalhes-tecnico.component';

const routes: Routes = [
  {
    path: '',
    component: TecnicosComponent,
    children: [
      { path: 'novo', component: NovoTecnicoComponent },
      { path: 'detalhes/:id', component: DetalhesTecnicoComponent },
      { path: 'gerenciar', component: GerenciarComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
