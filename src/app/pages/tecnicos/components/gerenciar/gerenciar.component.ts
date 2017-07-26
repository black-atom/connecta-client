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
      nome: { 
        title: 'Nome do técnico',     
        type: 'string'  
      },
      telefone: {
        title: 'Telefone',
        type: 'number',
      },
      celular: { 
        title: 'Celular', 
        type: 'number' 
      },
      habilitacao: { 
        title: 'N° Habilitação',      
        type: 'string' 
      },
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
