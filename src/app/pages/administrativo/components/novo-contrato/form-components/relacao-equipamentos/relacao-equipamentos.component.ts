import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-relacao-equipamentos',
  templateUrl: './relacao-equipamentos.component.html'
})
export class RelacaoEquipamentosComponent {

  @Output()
  editEquipamento = new EventEmitter();

  @Output()
  removeEquipamento = new EventEmitter();

  @Input()
  formProposta;

  @Input()
  indexProposta;

  constructor() { }

  retirarEquipamento(indexEquipamento) {
    const indexProposta = this.indexProposta;
    this.removeEquipamento.emit({ indexEquipamento, indexProposta });
  }

  editarEquipamento(indexEquipamento) {
    const indexProposta = this.indexProposta;
    this.editEquipamento.emit({ indexEquipamento, indexProposta });
  }

}
