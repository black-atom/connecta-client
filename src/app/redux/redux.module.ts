import { reducers } from './index';
import { ModuloCompartilhado } from '../shared/shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginEffects } from './../pages/login/redux/loging.effects';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { localStorageSync } from 'ngrx-store-localstorage';


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['login'], rehydrate: true })(reducer);
}
const metaReducers: [MetaReducer<any, any>] = [localStorageSyncReducer];

@NgModule({
  imports: [
    EffectsModule.forRoot([LoginEffects]),
    StoreModule.forRoot(
      reducers,
      { metaReducers }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    ModuloCompartilhado
  ]
})
export class ReduxModule { }
