import { LoginState } from './../pages/login/redux/login.reducer';
import { loginReducer } from '../pages/login/redux/login.reducer';
import { ActionReducer, combineReducers, Action } from '@ngrx/store';

export interface AppState {
  login: LoginState;
}

export const reducers = {
    login: loginReducer
};

const productionReducer: ActionReducer<any> = combineReducers(reducers);

export function reducer(state: any, action: Action) {
    return productionReducer(state, action);
}

