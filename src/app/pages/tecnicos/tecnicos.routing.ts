import { Routes, RouterModule } from '@angular/router';

import { TecnicosComponent } from './tecnicos.component';
import { NovoTecnicoComponent } from './components/novo-tecnico';
import { GerenciarComponent } from './components/gerenciar/gerenciar.component';

const routes: Routes = [
  {
    path: '',
    component: TecnicosComponent,
    children: [
      { path: 'novo', component: NovoTecnicoComponent },
      { path: 'gerenciar', component: GerenciarComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
