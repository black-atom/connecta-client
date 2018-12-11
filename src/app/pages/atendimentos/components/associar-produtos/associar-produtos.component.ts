import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-associar-produtos',
  templateUrl: './associar-produtos.component.html',
  styleUrls: ['./associar-produtos.component.scss']
})
export class AssociarProdutosComponent implements OnInit {

  @Input()
  products = [];

  @Output()
  removeProductReserved = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  removeItem(product) {
    this.removeProductReserved.emit(product);
  }

}
