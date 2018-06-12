import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gerenciar-contrato',
  templateUrl: './gerenciar-contrato.component.html',
  styleUrls: ['./gerenciar-contrato.component.scss']
})
export class GerenciarContratoComponent implements OnInit {

  public produtos$: Observable<any[]>;
  public carregando: boolean = true;

  public totalRecords;

  constructor() { }

  ngOnInit() { }

}
