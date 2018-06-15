import { Routes, RouterModule } from '@angular/router';

import { AdministrativoComponent } from './administrativo.component';
import { NovoContratoComponent } from './components/novo-contrato/novo-contrato.component';
import { FormCanDeactivateGuard } from 'app/shared/guards/form-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: AdministrativoComponent,
    children: [
      { path: 'novo', component: NovoContratoComponent, canDeactivate: [FormCanDeactivateGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
