import { LoginService } from '../services/login-service';
import { getIsLogged } from '../../pages/login/redux/login.reducer';
import { Observable } from 'rxjs/Rx';
import { AppState } from '../../redux';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoggedGuardService implements CanActivate {

  isLogged: boolean;

  constructor(
    private loginService: LoginService,
    private _router: Router
  ) {}


  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginService.estaLogado()) {
      return true;
    } else {
      this._router.navigate(['login']);
      return false;
    }
  }

}
