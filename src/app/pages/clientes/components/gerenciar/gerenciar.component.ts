import { Component, OnInit } from '@angular/core';

import { ClienteService } from './../../../../shared/services/cliente-service/cliente.service';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./gerenciar.component.scss']
})
export class GerenciarComponent implements OnInit {

  settings = {
    actions: false,
    columns: {
      cnpj_cpf: { 
        title: 'CNPJ/CPF',     
        type: 'number'  
      },
      nome_fantasia: { 
        title: 'Nome', 
        type: 'string' },
      email: { 
        title: 'E-mail',      
        type: 'string' 
      },
      telefone: { 
        title: 'Telefone',     
        type: 'string' 
      },
    },
  };

  source: LocalDataSource;

  constructor(private clienteService: ClienteService) { 
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.clienteService.retornarTodos().subscribe(clientes => {
      this.source.load(clientes);
      console.log(this.source);
    });
  }


}
