import { Observable } from 'rxjs/Rx';
import { LoginState } from './login.reducer';
import { LoginService } from './../../../shared/services/login-service/login.service';
import { LoginActions } from './login.actions';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginEffects {

  constructor(
    private actions$: Actions,
    private loginService: LoginService
  ) {}

  @Effect() login$ = this.actions$
  .ofType(LoginActions.LOGIN)
  .map(action => action.payload )
  .switchMap( payload => {
    return this.loginService.logar(payload)
    .map( (response: LoginState) => LoginActions.loginSuccess(response) )
    .catch( () => Observable.of({ type: LoginActions.LOGIN_FAILED }) ) ;
  });

}
