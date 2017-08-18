
import { Action } from '@ngrx/store';


export class LoginActions{
  static LOGIN = 'LOGIN';
  static LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  static LOGIN_FAILED = 'LOGIN_FAILED';
  static LOGOUT = 'LOGOUT';
  static LOGOUT_FAILED = 'LOGOUT_FAILED';

  static login(user): Action{
    return { type: this.LOGIN, payload: user };
  }
}
