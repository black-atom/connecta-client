import { FormCanDeactivateGuard } from './../../shared/guards/form-deactivate.guard';
import { Routes, RouterModule } from '@angular/router';


import { MercadoLivreComponent } from './mercado-livre.component';
import { NovoComponent } from './components/novo/novo.component';
import { GerenciarComponent } from './components/gerenciar/gerenciar.component';
import { EditarComponent } from './components/editar/editar.component';


const routes: Routes = [
  {
    path: '',
    component: MercadoLivreComponent,
    children: [
      { path: 'novo', component: NovoComponent },
      { path: 'gerenciar', component: GerenciarComponent },
      { path: 'editar-mercado-livre/:id', component: EditarComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
