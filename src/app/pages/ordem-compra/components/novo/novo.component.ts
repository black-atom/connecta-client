import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription, Observable } from 'rxjs/Rx';

import { NotificacaoService, OrdemCompraService, ProdutoService } from './../../../../shared/services';

import { Produto } from './../../../../models/produto.interface';
import { categoriaProdutos } from './../../../../utils/mocks/equipamentos';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.scss']
})
export class NovoComponent implements OnInit, OnDestroy {

  public orderBuyForm: FormGroup;
  public productForm: FormGroup;
  public categoriaProdutos = categoriaProdutos;
  private subscription: Subscription;
  public productsSearch$: Observable<Produto[]>;
  products = [];


  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private notificacaoService: NotificacaoService,
    private ordemCompraService: OrdemCompraService
  ) { }

  ngOnInit() {
    this.initForm();
    this.initProductForm();
  }

  initForm() {
    this.orderBuyForm = this.fb.group({
      buyID: [this.generateSKU(), Validators.required],
      description: ['', Validators.required],
      baseStock: ['', Validators.required],
      products: this.fb.array([])
    });
  }

  initProductForm() {
    this.productForm = this.fb.group({
      description: ['', Validators.required],
      quantity: [1, Validators.required],
      productID: ['', Validators.required],
      serialControl: [false, Validators.required],
      baseStock: ['', Validators.required]
    });
  }

  searchProduct(description) {
    if (description) {
      this.productsSearch$ = this.produtoService
        .produtosLazyLoad(0, 10, { description })
        .map(({ produtos }) => produtos);
    }
  }

  pecaSelecionada({ description, serialControl, _id }) {
    const formProduct = this.productForm;
    formProduct.get('description').patchValue(description);
    formProduct.get('productID').patchValue(_id);
    formProduct.get('serialControl').patchValue(serialControl);
    formProduct.get('baseStock').patchValue(this.orderBuyForm.get('baseStock').value);
    return this.productsSearch$ = Observable.of([]);
  }

  generateSKU = () => {
    const size = 10;
    const skuChars = '0123456789';
    const length = skuChars.length - 1;
    let sku = '';

    for (let i = 0; i < size; i++) {
      const randomCharPosition = Math.round(Math.random() * length);
      sku += skuChars.charAt(randomCharPosition);
    }
    return sku;
  }

  get productsFormArray(): FormArray {
    return this.orderBuyForm.get('products') as FormArray;
  }

  addProduct(product) {
    const products = this.productsFormArray;
    products.push(this.fb.group(product));
    this.products = products.value;
    this.initProductForm();
  }

  removeItem(index) {
    const products = this.productsFormArray;
    products.removeAt(index);
    this.products = products.value;
  }

  saveOrderBuy(orderBuy: Produto) {
    this.subscription =
      this.ordemCompraService.createOrderBuy(orderBuy)
        .subscribe(res => res ? this.sucessoNotification() : this.falhaNotification());
    this.productsSearch$ = Observable.of([]);
  }

  sucessoNotification() {
    this.notificacaoService.notificarSucesso(
      'Compra criada com sucesso!',
      ''
    );
    this.initForm();
  }

  falhaNotification() {
    this.notificacaoService.notificarErro(
      'Não foi possível criar uma nova compra!',
      ''
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
