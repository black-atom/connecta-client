import { Component, Input } from '@angular/core';
import { EquipamentoContrato } from 'app/models/contrato.interface';

@Component({
  selector: 'app-equipamentos-modal',
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.scss']
})
export class EquipamentosModalComponent {

  @Input()
  public equipamentos: EquipamentoContrato[];

}
