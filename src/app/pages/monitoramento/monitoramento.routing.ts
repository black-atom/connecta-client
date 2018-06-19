import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { MonitoramentoComponent } from './monitoramento.component';
import { MonitoramentoTecnicosComponent } from './components/monitoramento-tecnicos/monitoramento-tecnicos.component';
import { TvComponent } from './components/tv/tv.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: MonitoramentoComponent,
    children: [
      { path: '', redirectTo: 'tv', pathMatch: 'full' },
      { path: 'tv', component: TvComponent },
      { path: 'monitoramento-tecnicos', component: MonitoramentoTecnicosComponent }


    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
