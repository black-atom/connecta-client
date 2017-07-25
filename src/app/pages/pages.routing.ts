import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'charts', pathMatch: 'full' },
      { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
      { path: 'home', loadChildren: './home/home.module.ts#HomeModule' },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
