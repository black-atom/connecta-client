import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-motivo',
  templateUrl : './motivo.component.html',
  styleUrls: ['./motivo.component.scss']
})
export class MotivoComponent implements OnInit {

  @Input()
  public showMotivo: boolean;

  @Input()
  public proposta: FormGroup;

  ngOnInit() { }

}
