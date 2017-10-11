import { IFormCanDeactivate } from './form-candeactivate.interface';
import { Observable } from 'rxjs/Rx';
import { NovoClienteComponent } from './../../pages/clientes/components/novo-cliente/novo-cliente.component';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class FormCanDeactivateGuard implements CanDeactivate<IFormCanDeactivate> {

        canDeactivate(
            component: IFormCanDeactivate,
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): 
        
        Observable<boolean>|Promise<boolean>|boolean {
            return component.podeDesativar ? component.podeDesativar() : true;            
    }
}
