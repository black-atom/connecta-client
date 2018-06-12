import { Routes, RouterModule } from '@angular/router';

import { AdministrativoComponent } from './administrativo.component';
import { NovoContratoComponent } from './components/novo-contrato/novo-contrato.component';
import { GerenciarContratoComponent } from './components/gerenciar-contrato/gerenciar-contrato.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrativoComponent,
    children: [
      { path: 'novo', component: NovoContratoComponent },
      { path: 'gerenciar', component: GerenciarContratoComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
