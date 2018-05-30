import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-relacao-equipamentos',
  templateUrl: './relacao-equipamentos.component.html'
})
export class RelacaoEquipamentosComponent {

  @Input()
  formProposta;

  constructor() { }

}
