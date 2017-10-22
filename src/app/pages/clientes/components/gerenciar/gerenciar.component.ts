import { Cliente } from './../../../../models/cliente.interface';
import { Component, OnInit , OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { ClienteService } from './../../../../shared/services';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html'
})
export class GerenciarComponent implements OnInit, OnDestroy {

 
  private subscription: Subscription;
  public clientes: Cliente[];
  carregando: boolean = true;
  
  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.subscription = this.clienteService.retornarTodos().subscribe(clientes => {
      this.clientes = clientes
      this.carregando = false;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  teste(c) {
    console.log(c)
  }
}
