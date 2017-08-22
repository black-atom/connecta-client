// import { getIsLogged } from '../../pages/login/redux/login.reducer';
// import { Observable } from 'rxjs/Rx';
// import { AppState } from '../../redux';
// import { Store } from '@ngrx/store';
// import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
// import { Injectable } from '@angular/core';

// @Injectable()
// export class LoggedGuardService implements CanActivate {

//   isLogged: boolean;

//   constructor(
//     private _store: Store<AppState>,
//     private _router: Router
//   ) { console.log("new"); }


//   public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//       this._store.select(getIsLogged)
//       .subscribe(isLogged => {
//         this.isLogged = isLogged;
//         if ( isLogged ) {
//         }else {
//           this._router.navigate(['/login']);
//         }
//       });
//       return this.isLogged;
//   }


// }
