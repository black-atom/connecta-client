import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { Pages } from './pages.component';
import { LoggedGuardService } from './../shared/guards/logged-guard.service';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'pages',
    component: Pages,
    canActivate: [LoggedGuardService],
    children: [
      { path: '', redirectTo: 'monitoramento', pathMatch: 'full' },
      { path: 'monitoramento', loadChildren: './monitoramento/monitoramento.module#MonitoramentoModule' },
      { path: 'clientes', loadChildren: './clientes/clientes.module#ClientesModule' },
      { path: 'funcionarios', loadChildren: './funcionarios/funcionarios.module#FuncionariosModule' },
      { path: 'atendimentos', loadChildren: './atendimentos/atendimentos.module#AtendimentosModule' },
      { path: 'administrativo', loadChildren: './administrativo/administrativo.module#AdministrativoModule' },
      { path: 'relatorios', loadChildren: './relatorios/relatorios.module#RelatoriosModule' },
      { path: 'sac', loadChildren: './sac/sac.module#SacModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
