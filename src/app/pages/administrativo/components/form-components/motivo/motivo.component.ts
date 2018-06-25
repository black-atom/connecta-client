import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-motivo',
  templateUrl: './motivo.component.html'
})
export class MotivoComponent implements OnInit {

  @Input()
  public motivoForm: FormGroup;

  ngOnInit() {

  }

}
