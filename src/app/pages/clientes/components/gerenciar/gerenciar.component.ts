import { Component, OnInit } from '@angular/core';


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
      _id: {
        title: 'Detalhes',
        type: 'custom',
        // renderComponent: ButtonViewComponent 
      },
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
