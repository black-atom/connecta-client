import { Funcionario } from '../../../models/funcionario.interface';
import { LoginActions } from './login.actions';
import { ActionReducer, Action } from '@ngrx/store';


export interface LoginState {
  token: string;
  logged: boolean;
  funcionario: Funcionario;
}

const initialState: LoginState = {
  token: null,
  logged: false,
  funcionario: null
};

export const loginReducer: ActionReducer<LoginState> = ( state = initialState , { type, payload }: Action ) => {

  switch ( type ) {
    case LoginActions.LOGIN_SUCCESS:
      return Object.assign({}, state, payload);
    default:
      return state;
  }

};

