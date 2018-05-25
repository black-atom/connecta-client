import { equipamentosTemporarios } from './../equipamento.mock.temp';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-contrato',
  templateUrl: './form-contrato.component.html',
  styleUrls: ['./form-contrato.component.scss']
})
export class FormContratoComponent implements OnInit {

  @Input()
  public contratoFormControl;
  public equipamentos = equipamentosTemporarios;

  constructor() { }

  ngOnInit() { }

}
