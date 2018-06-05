import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-relacao-equipamentos',
  templateUrl: './relacao-equipamentos.component.html'
})
export class RelacaoEquipamentosComponent {

  @Input()
  formProposta;

  @Input()
  indexProposta;

  @Output()
  editEquipamento = new EventEmitter();

  @Output()
  removeEquipamento = new EventEmitter();

  constructor() { }

  retirarEquipamento(indexEquipamento) {
    const indexProposta = this.indexProposta;
    this.removeEquipamento.emit({ indexEquipamento, indexProposta });
  }

  editarEquipamento(equipamento, index) {
    const indexProposta = this.indexProposta;
    this.editEquipamento.emit({ equipamento, index });
  }

}
