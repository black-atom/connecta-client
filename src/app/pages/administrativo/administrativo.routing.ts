import { Routes, RouterModule } from '@angular/router';

import { AdministrativoComponent } from './administrativo.component';
import { NovoContratoComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: AdministrativoComponent,
    children: [
      { path: 'novo', component: NovoContratoComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
