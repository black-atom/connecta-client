import { Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';

import { equipamentosTemporarios } from './../../equipamento.mock.temp';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-equipamentos-contrato',
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.scss']
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

  public formEquipamento: FormGroup;

  public equips = equipamentosTemporarios;
  public equipamentoSelecionado;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.equipamentoForm();
  }

  equipamentoForm() {
    this.formEquipamento = this.fb.group({
      modelo: ['', Validators.required],
      fabricante: ['', Validators.required],
      numero_serie: ['', Validators.required],
      visita: ['', Validators.required],
      valor: ['', Validators.required],
      endereco: {
        cep: ['', Validators.required],
        rua: ['', Validators.required],
        bairro: ['', Validators.required],
        numero: ['', Validators.required],
        cidade: ['', Validators.required],
        complemento: [''],
        uf: ['', Validators.required],
        ponto_referencia: ['']
      }
    });
  }

  selecionarEquipamento(equipamento) {
    const indexProposta = this.indexProposta;
    this.sendEquipamento.emit({ equipamento, indexProposta });
  }

  salvarEquipamento(equipamento) {
    const indexProposta = this.indexProposta;
    this.sendEquipamento.emit({ equipamento, indexProposta });
  }

  retirarEquipamento(indexEquipamento) {
    const indexProposta = this.indexProposta;
    this.removeEquipamento.emit({ indexEquipamento, indexProposta });
  }

}

