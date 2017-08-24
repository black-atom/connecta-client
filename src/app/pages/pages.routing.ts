// import { LoggedGuardService } from '../shared/guards/logged-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  // {
  //   path: 'login',
  //   loadChildren: 'app/pages/login/login.module#LoginModule'
  // },
  {
    path: 'pages',
    component: Pages,
    // canActivate: [LoggedGuardService],
    children: [
      { path: '', redirectTo: 'charts', pathMatch: 'full' },
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'clientes', loadChildren: './clientes/clientes.module#ClientesModule' },
      { path: 'funcionarios', loadChildren: './funcionarios/funcionarios.module#FuncionariosModule' },
      { path: 'atendimentos', loadChildren: './atendimentos/atendimentos.module#AtendimentosModule' },
      { path: 'sac', loadChildren: './sac/sac.module#SacModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
