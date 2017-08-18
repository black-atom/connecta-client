import { LoginActions } from './login.actions';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginEffects {

  constructor(
    private actions$: Actions
  ) {}

  // @Effect() login$ = this.actions$
  // .ofType(LoginActions.LOGIN)
  // .map(action => action.payload )
  // .switchMap( payload => {
  //   retun
  // });

}
