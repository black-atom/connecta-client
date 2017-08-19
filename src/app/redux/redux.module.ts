import { SharedModule } from '../shared/shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginEffects } from './../pages/login/redux/loging.effects';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    EffectsModule.run(LoginEffects),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    SharedModule
  ]
})
export class ReduxModule { }
