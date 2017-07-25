import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Home } from './home.component';
import { routing } from './home.routing';


@NgModule({
  imports: [
    CommonModule,
    routing,
  ],
  declarations: [Home],
})
export class HomeModule { }
