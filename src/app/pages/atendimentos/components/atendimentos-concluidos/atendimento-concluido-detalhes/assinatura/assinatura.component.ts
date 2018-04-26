import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assinatura',
  templateUrl: './assinatura.component.html',
  styleUrls: ['./assinatura.component.scss']
})
export class AssinaturaComponent implements OnInit {

  @Input()
  assinaturaDetail;

  constructor() { }

  ngOnInit() {
  }

}
