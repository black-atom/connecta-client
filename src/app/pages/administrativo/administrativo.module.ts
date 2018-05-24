import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { routing } from './administrativo.routing';
import { TextMaskModule } from 'angular2-text-mask';
import { ModuloCompartilhado } from '../../shared/shared.module';

import { NovoContratoComponent } from './components';
import { AdministrativoComponent } from './administrativo.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
    ModuloCompartilhado,
    routing
  ],
  declarations: [
    AdministrativoComponent,
    NovoContratoComponent
  ]
})
export class AdministrativoModule { }
