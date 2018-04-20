import { Routes, RouterModule } from '@angular/router';

import { AtendimentosComponent } from './atendimentos.component';
import { NovoAtendimentoComponent } from './components/novo-atendimento';
import { AssociarComponent } from './components/associar';
import { GerenciarComponent } from './components/gerenciar';
import { DetalhesAtendimentoComponent } from './components/detalhes-atendimento';
import { DadosInteracaoAppComponent } from './components/dados-interacao-app/dados-interacao-app.component';
import { FormCanDeactivateGuard } from './../../shared/guards/form-deactivate.guard';
import { AtendimentosConcluidosComponent } from './components/atendimentos-concluidos/atendimentos-concluidos.component';


const routes: Routes = [
  {
    path: '',
    component: AtendimentosComponent,
    children: [
      { path: 'novo', component: NovoAtendimentoComponent,  canDeactivate: [FormCanDeactivateGuard] },
      { path: 'associar', component: AssociarComponent },
      { path: 'gerenciar', component: GerenciarComponent },
      { path: 'gerenciar-concluidos', component: AtendimentosConcluidosComponent },
      { path: 'detalhes/:id', component: DetalhesAtendimentoComponent,  canDeactivate: [FormCanDeactivateGuard] },
      { path: 'dados-app/:id', component: DadosInteracaoAppComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
