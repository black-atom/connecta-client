import { Routes, RouterModule } from '@angular/router';

import { AdministrativoComponent } from './administrativo.component';
import { NovoContratoComponent } from './components/novo-contrato/novo-contrato.component';
import { GerenciarContratoComponent } from './components/gerenciar-contrato/gerenciar-contrato.component';
import { FormCanDeactivateGuard } from 'app/shared/guards/form-deactivate.guard';
import { EditarContratoComponent } from './components/editar-contrato/editar-contrato.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrativoComponent,
    children: [
      { path: 'gerenciar', component: GerenciarContratoComponent },
      { path: 'editar/:id', component: EditarContratoComponent },
      { path: 'novo', component: NovoContratoComponent, canDeactivate: [FormCanDeactivateGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
