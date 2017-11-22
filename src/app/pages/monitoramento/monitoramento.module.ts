import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { routing } from './monitoramento.routing';
import { MonitoramentoComponent } from './monitoramento.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboardControl: true,
  autoplay: 5000
};

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FlexLayoutModule,
    SwiperModule.forRoot(SWIPER_CONFIG),
    routing
  ],
  declarations: [MonitoramentoComponent]
})
export class MonitoramentoModule {}
