import { ActionWithPayload } from '../../../models/action';
import { LoginState } from './login.reducer';
import { AppState } from '../../../redux';
import { Funcionario } from '../../../models/funcionario.interface';
import { LoginActions } from './login.actions';
import { ActionReducer } from '@ngrx/store';


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

export function loginReducer( state = initialState , { type, payload }: ActionWithPayload ) {

  switch ( type ) {
    case LoginActions.LOGIN_SUCCESS:
      return Object.assign({}, state, payload, { error: null, logged: true });

    case LoginActions.LOGIN_FAILED:
      return Object.assign({}, state, { error: payload, logged: false });

    case LoginActions.LOGIN_SUCCESS:
      return Object.assign({}, initialState);

    default:
      return state;
  }

}

export const getLogin = (state: AppState) => state.login as LoginState;

export const getIsLogged = (state: AppState) => getLogin(state).logged;

export const getFuncionario = (state: AppState) => getLogin(state).funcionario;

