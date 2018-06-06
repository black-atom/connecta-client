import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-relacao-equipamentos',
  templateUrl: './relacao-equipamentos.component.html',
  styleUrls: ['./relacao-equipamentos.component.scss']
})
export class RelacaoEquipamentosComponent {

  @Input()
  formProposta: FormGroup;

  @Input()
  valorTotal: number;

  @Input()
  indexProposta: number;

  @Output()
  editEquipamento = new EventEmitter();

  @Output()
  removeEquipamento = new EventEmitter();

  constructor() { }

  retirarEquipamento(indexEquipamento: number): void {
    const indexProposta = this.indexProposta;
    this.removeEquipamento.emit({ indexEquipamento, indexProposta });
  }

  editarEquipamento(equipamento, index: number): void {
    const indexProposta = this.indexProposta;
    this.editEquipamento.emit({ equipamento, index });
  }

}
