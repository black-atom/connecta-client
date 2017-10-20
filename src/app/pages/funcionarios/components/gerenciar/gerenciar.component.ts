import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { FuncionarioService } from './../../../../shared/services';
import { Funcionario } from './../../../../models';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html'
})
export class GerenciarComponent implements OnInit, OnDestroy {

  funcionarios: Funcionario[];
  tecnicoSelecionado;

  
  private subscription: Subscription;

  constructor(private _funcionarioService: FuncionarioService) {}

  ngOnInit() {
    this.subscription = this._funcionarioService.retornarTodos().subscribe(funcionarios => {
       this.funcionarios = funcionarios
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

