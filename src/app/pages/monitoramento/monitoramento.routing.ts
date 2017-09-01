import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { MonitoramentoComponent } from './monitoramento.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: MonitoramentoComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
