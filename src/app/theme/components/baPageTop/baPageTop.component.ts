import { LoginActions } from './../../../pages/login/redux/login.actions';
import { AppState } from './../../../redux/index';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

import { GlobalState } from '../../../global.state';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop {

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;

  constructor(public store: Store<AppState>, private _state: GlobalState) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public logout() {
    this.store.dispatch({ type: LoginActions.LOGOUT });
  }
  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
