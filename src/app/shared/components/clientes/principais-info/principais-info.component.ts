import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-principais-info-cliente',
  templateUrl: './principais-info.component.html',
  styleUrls: ['./principais-info.component.scss']
})
export class PrincipaisInfoComponent implements OnInit {

  @Input() formDadosPrincipais: FormGroup;
   
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    }
}
