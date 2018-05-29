import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-equip',
  templateUrl: './equipamento-form.component.html'
})
export class EquipamentoFormComponent implements OnInit {


  @Input()
  public equipForm;

  constructor() { }

  ngOnInit() { }

}
