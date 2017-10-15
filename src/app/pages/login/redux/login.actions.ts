import { ActionWithPayload } from '../../../models/action';
import { LoginData } from '../../../models/login-data.interface';
import { LoginState } from './login.reducer';

export class LoginActions {
  static LOGIN = 'LOGIN';
  static LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  static LOGIN_FAILED = 'LOGIN_FAILED';
  static LOGOUT = 'LOGOUT';
  static LOGOUT_FAILED = 'LOGOUT_FAILED';
  static LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

  static login(user: LoginData): ActionWithPayload {
    return { type: this.LOGIN, payload: user };
  }

  static loginSuccess(payload: LoginState): ActionWithPayload {
    return { type: this.LOGIN_SUCCESS, payload };
  }

  static loginFailed(payload: string): ActionWithPayload {
    return { type: this.LOGIN_FAILED, payload };
  }
}
