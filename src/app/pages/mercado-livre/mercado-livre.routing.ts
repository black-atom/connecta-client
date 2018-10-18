import { FormCanDeactivateGuard } from './../../shared/guards/form-deactivate.guard';
import { Routes, RouterModule } from '@angular/router';


import { MercadoLivreComponent } from './mercado-livre.component';
import { NovoComponent } from './components/novo/novo.component';
import { GerenciarComponent } from './components/gerenciar/gerenciar.component';


const routes: Routes = [
  {
    path: '',
    component: MercadoLivreComponent,
    children: [
      { path: 'novo', component: NovoComponent },
      { path: 'gerenciar', component: GerenciarComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
