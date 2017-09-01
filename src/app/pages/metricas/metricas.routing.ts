import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { MetricasComponent } from './metricas.component';
import { AtendimentosComponent } from './components/atendimentos/atendimentos.component';


// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: MetricasComponent,
    children: [
        { path: 'atendimentos', component: AtendimentosComponent }
     ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
