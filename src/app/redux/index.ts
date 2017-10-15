import { LoginState } from './../pages/login/redux/login.reducer';
import { loginReducer } from '../pages/login/redux/login.reducer';
import { ActionReducer, combineReducers, Action } from '@ngrx/store';

export interface AppState {
  login: LoginState;
}

export const reducers = {
    login: loginReducer
};
