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
      { path: 'monitoramento-tecnicos', component: MonitoramentoTecnicosComponent },
      { path: 'tv', component: TvComponent }

    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
