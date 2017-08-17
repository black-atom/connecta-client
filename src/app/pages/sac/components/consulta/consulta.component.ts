import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  settings = {
    actions: false,
    columns: {
      data: { 
        title: 'Data',     
        type: 'string'  
      },
      nome: {
        title: 'Nome',
        type: 'number'
      },
      tipo_atendimento: { 
        title: 'Tipo',      
        type: 'string' 
      },
      nota: {
        title: 'Nota',
        type: 'number'
      },
      tecnico: {
        title: 'Técnico',
        type: 'string'
      },
      _id: {
        title: 'Detalhes',
        type: 'custom'
      }
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
