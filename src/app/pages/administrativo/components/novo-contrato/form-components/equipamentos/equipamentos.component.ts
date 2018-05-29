import { Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';

import { equipamentosTemporarios } from './../../equipamento.mock.temp';

@Component({
  selector: 'app-equipamentos-contrato',
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamento.component.scss']
})

export class EquipamentosContratoComponent implements OnInit {

  @Input()
  public formProposta;

  @Input()
  public indexProposta;

  @Output()
  sendEquipamento = new EventEmitter();

  @Output()
  removeEquipamento = new EventEmitter();

  public equips = equipamentosTemporarios;

  constructor() { }

  ngOnInit() { }

  equipamentoSelecionado(equipamento) {
    const indexProposta = this.indexProposta;
    this.sendEquipamento.emit({ equipamento, indexProposta });
  }

  retirarEquipamento(indexEquipamento) {
    const indexProposta = this.indexProposta;
    this.removeEquipamento.emit({ indexEquipamento, indexProposta });
  }

}

