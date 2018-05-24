import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './monitoramento.routing';
import { MonitoramentoComponent } from './monitoramento.component';
import { FlexLayoutModule, toAlignContentValue } from '@angular/flex-layout';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ModuloCompartilhado } from '../../shared/shared.module';
import { CardTecnicoDetailComponent } from './components/card-tecnico-detail/card-tecnico-detail.component';
import { MonitoramentoTecnicosComponent } from './components/monitoramento-tecnicos/monitoramento-tecnicos.component';
import { TvComponent } from './components/tv/tv.component';

const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  setWrapperSize: true,
  keyboardControl: true,
  effect: 'fade',
  autoplay: 7000,
  autoplayDisableOnInteraction: false,
  slidesPerView: 1
};

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FlexLayoutModule,
    ModuloCompartilhado,
    NgbModule,
    SwiperModule.forRoot(SWIPER_CONFIG),
    routing
  ],
  declarations: [
    MonitoramentoComponent,
    CardTecnicoDetailComponent,
    MonitoramentoTecnicosComponent,
    TvComponent,
  ],
  entryComponents: [
    CardTecnicoDetailComponent,
  ]
})
export class MonitoramentoModule {}
