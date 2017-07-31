import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-associar',
  templateUrl: './associar.component.html',
  styleUrls: ['./associar.component.scss']
})
export class AssociarComponent implements OnInit {

  tecnicos: any[] = [
    { nome: 'Alexandre' },
    { nome: 'Rafael' },
    { nome: 'Vitor' },
    { nome: 'Adelaide' },
    { nome: 'João' },
    { nome: 'Alan' },
    { nome: 'José' },
    { nome: 'Caio' },
    { nome: 'Juricléia' },
    { nome: 'Thalita' },
  ];

  constructor() {}

  ngOnInit() {}

  
}
