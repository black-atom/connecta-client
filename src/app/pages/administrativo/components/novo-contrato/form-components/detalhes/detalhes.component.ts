import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalhes-contrato',
  templateUrl: './detalhes.component.html'
})
export class DetalhesContratoComponent {

  @Input()
  public contratoControl;

}
