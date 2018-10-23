import { Produto } from './../../../../models/produto.interface';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MercadoLivreServiceService, ProdutoService } from './../../../../shared/services';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.scss']
})
export class NovoComponent implements OnInit {

  products = [];
  orderSellForm: FormGroup;
  productForm: FormGroup;
  public productsSearch$: Observable<Produto[]>;
  private date = new Date();
  public inputDate: any;

  constructor(
    private fb: FormBuilder,
    private mercadoLivreServiceService: MercadoLivreServiceService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this.initForm();
    this.initProductForm();
    this.inputDate = {
      year: this.date.getFullYear(),
      day: this.date.getDate(),
      month: this.date.getMonth() + 1
    };
  }


  mask(valorDaLinha: string) {
    let valor = '';
    if (valorDaLinha !== undefined) {
      valor = valorDaLinha.replace(/\D+/g, '');
    }

    if (valor.length > 11) {
      return [/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/];
    }

    return [/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/];

  }

  initForm() {
    this.orderSellForm = this.fb.group({
      dateSell: [''],
      documentID: [''],
      customerName: [''],
      status: ['aberto'],
      nf: [false],
      productsSell: this.fb.array([])
    });
  }

  get productsSell(): FormArray {
    return this.orderSellForm.get('productsSell') as FormArray;
  }

  searchProduct(description) {
    if (description) {
      this.productsSearch$ = this.produtoService
        .produtosLazyLoad(0, 10, { description })
        .map(({ produtos }) => produtos);
    }
  }

  pecaSelecionada({ description, buyPrice, _id, sellPrice }) {
    const formProduct = this.productForm;
    formProduct.get('description').patchValue(description);
    formProduct.get('buyPrice').patchValue(buyPrice);
    formProduct.get('sellPrice').patchValue(sellPrice);
    formProduct.get('productID').patchValue(_id);
    return this.productsSearch$ = Observable.of([]);
  }


  initProductForm() {
    this.productForm = this.fb.group({
      description: [''],
      quantity: [1],
      buyPrice: [''],
      tarifMercadoLivre: [''],
      productID: [''],
      deliveryPrice: [''],
      sellPrice: ['']
    });
  }

  addProduct(product) {
    const productsSell = this.productsSell;
    productsSell.push(product);
    this.initProductForm();
    this.products = productsSell.value;
  }

  removeItem(index) {
    const productsSell = this.productsSell;
    productsSell.removeAt(index);
    this.products = productsSell.value;
  }


  saveOrderSell(orderSellForm) {
    const nf = orderSellForm.nf === true || orderSellForm.nf === 'true' ? true : false;
    const orderSell = {
      ...orderSellForm,
      nf
    };
    console.log(orderSell);
    // this.mercadoLivreServiceService.createOrderSell(orderSell).subscribe(res => console.log(res));
  }
}

