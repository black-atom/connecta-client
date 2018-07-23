import { Component, Input } from '@angular/core';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalhes-contrato',
  templateUrl: './detalhes.component.html'
})
export class DetalhesContratoComponent {

  @Input()
  public contratoControl;

  public patternRange = [/\d/, /\d/];

  constructor(
    public config: NgbDatepickerConfig
  ) {
    config.minDate = { year: 1970, month: 1, day: 1 };
    config.maxDate = { year: 2070, month: 12, day: 31 };
  }

}
