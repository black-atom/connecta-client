import { Routes, RouterModule } from '@angular/router';
import { RelatorioTecnicosComponent } from './relatorio-tecnicos/relatorio-tecnicos.component';
import { RelatorioComponent } from './relatorio.component';

const routes: Routes = [
  {
    path: '',
    component: RelatorioComponent,
    children: [
      { path: 'tecnicos', component: RelatorioTecnicosComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
