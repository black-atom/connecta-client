
import { Routes, RouterModule } from '@angular/router';

import { SacComponent } from './sac.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: SacComponent,
    children: [
      { path: 'consulta', component: ConsultaComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
