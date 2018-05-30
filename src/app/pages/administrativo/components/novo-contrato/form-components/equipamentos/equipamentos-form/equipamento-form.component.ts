import { equipamentosTemporarios } from './../../../equipamento.mock.temp';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-equip',
  templateUrl: './equipamento-form.component.html',
  styleUrls: ['./equipamento-form.component.scss']
})
export class EquipamentoFormComponent implements OnInit {

  @Output()
  sendEquipamento = new EventEmitter();

  public formEquipamento: FormGroup;
  public equips = equipamentosTemporarios;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.equipamentoForm();
  }

  selecionarEquipamento(equipamento) {
    this.formEquipamento.get('modelo').patchValue(equipamento.modelo);
    this.formEquipamento.get('fabricante').patchValue(equipamento.fabricante);
  }

  adicionarEquipamento() {
    this.sendEquipamento.emit(this.formEquipamento.value);
  }

  equipamentoForm() {
    this.formEquipamento = this.fb.group({
      modelo: ['', Validators.required],
      fabricante: ['', Validators.required],
      numero_serie: ['', Validators.required],
      visita: ['', Validators.required],
      valor: ['', Validators.required],
      endereco: this.fb.group({
        cep: ['', Validators.required],
        rua: ['', Validators.required],
        bairro: ['', Validators.required],
        numero: ['', Validators.required],
        cidade: ['', Validators.required],
        complemento: [''],
        uf: ['', Validators.required],
        ponto_referencia: ['']
      })
    });
  }

}
