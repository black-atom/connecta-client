import { Routes, RouterModule } from '@angular/router';

import { AtendimentosComponent } from './atendimentos.component';
import { NovoAtendimentoComponent } from './components/novo-atendimento';
import { AssociarComponent } from './components/associar/associar.component';
import { GerenciarComponent } from './components/gerenciar/gerenciar.component';

const routes: Routes = [
  {
    path: '',
    component: AtendimentosComponent,
    children: [
      { path: 'novo', component: NovoAtendimentoComponent },
      { path: 'associar', component: AssociarComponent },
      { path: 'gerenciar', component: GerenciarComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
