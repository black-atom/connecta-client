import { LoginState } from './login.reducer';
import { AppState } from '../../../redux';
import { Funcionario } from '../../../models/funcionario.interface';
import { LoginActions } from './login.actions';
import { ActionReducer, Action } from '@ngrx/store';


export interface LoginState {
  token: string;
  logged: boolean;
  funcionario: Funcionario;
  error: string;
}

const initialState: LoginState = {
  token: null,
  logged: false,
  funcionario: null,
  error: null
};

export const loginReducer: ActionReducer<LoginState> = ( state = initialState , { type, payload }: Action ) => {

  switch ( type ) {
    case LoginActions.LOGIN_SUCCESS:
      return Object.assign({}, state, payload, { error: null, logged: true });

    case LoginActions.LOGIN_FAILED:
      return Object.assign({}, state, { error: payload, logged: false });

    default:
      return state;
  }

};

export const getLogin = (state: AppState) => state.login as LoginState;

export const getIsLogged = (state: AppState) => getLogin(state).logged;

