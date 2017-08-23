import { Routes, RouterModule } from '@angular/router';

import { AtendimentosComponent } from './atendimentos.component';
import { NovoAtendimentoComponent } from './components/novo-atendimento';
import { AssociarComponent } from './components/associar';
import { GerenciarComponent } from './components/gerenciar';
import { DetalhesAtendimentoComponent } from './components/detalhes-atendimento';


const routes: Routes = [
  {
    path: '',
    component: AtendimentosComponent,
    children: [
      { path: 'novo', component: NovoAtendimentoComponent },
      { path: 'associar', component: AssociarComponent },
      { path: 'gerenciar', component: GerenciarComponent },
      { path: 'detalhes/:id', component: DetalhesAtendimentoComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
