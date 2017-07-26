import { CepService } from './services/cep-service/cep.service';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
  ],
  declarations: [

  ],
  providers: [
    CepService,
  ],
  exports: [
    //Components that should be exported for other modules
  ]
})
export class SharedModule { }
