import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboardControl: true,
  // autoplay: 2000
};

import { routing } from './monitoramento.routing';
import { MonitoramentoComponent } from './monitoramento.component';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing,
    SwiperModule.forRoot(SWIPER_CONFIG)

  ],
  declarations: [MonitoramentoComponent]
})
export class MonitoramentoModule {}
