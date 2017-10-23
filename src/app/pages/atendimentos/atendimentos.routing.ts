import { Routes, RouterModule } from '@angular/router';

import { AtendimentosComponent } from './atendimentos.component';
import { NovoAtendimentoComponent } from './components/novo-atendimento';
import { AssociarComponent } from './components/associar';
import { GerenciarComponent } from './components/gerenciar';
import { DetalhesAtendimentoComponent } from './components/detalhes-atendimento';
import { DadosInteracaoAppComponent } from './components/dados-interacao-app/dados-interacao-app.component';
import { FormCanDeactivateGuard } from './../../shared/guards/form-deactivate.guard';


const routes: Routes = [
  {
    path: '',
    component: AtendimentosComponent,
    children: [
      { path: 'novo', component: NovoAtendimentoComponent,  canDeactivate: [FormCanDeactivateGuard] },
      { path: 'associar', component: AssociarComponent },
      { path: 'gerenciar', component: GerenciarComponent },
      { path: 'detalhes/:id', component: DetalhesAtendimentoComponent,  canDeactivate: [FormCanDeactivateGuard] },
      { path: 'dados-app/:id', component: DadosInteracaoAppComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
