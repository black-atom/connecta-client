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
  public categoriaProdutos = categoriaProdutos;
  private subscription: Subscription;
  public productsSearch$: Observable<Produto[]>;
  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private notificacaoService: NotificacaoService,
    private ordemCompraService: OrdemCompraService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.orderBuyForm = this.fb.group({
      buyID: [this.generateSKU(), Validators.required],
      description: ['', Validators.required],
      products: this.fb.array([])
    });
    this.addProduct();
  }

  productForm() {
    return this.fb.group({
      description: ['', Validators.required],
      quantity: [1, Validators.required],
      productID: ['', Validators.required]
    });
  }


  searchProduct(value) {
    if (value.length > 4) {
      this.productsSearch$ = this.produtoService
        .produtosLazyLoad(0, 10, { descricao: value })
        .map(({ produtos }) => produtos);
    }
  }

  pecaSelecionada({ descricao, modelo, _id }, index) {
    const productsForm = this.products.at(index);
      productsForm.get('description').patchValue(`${descricao} ${modelo}`);
      productsForm.get('productID').patchValue(_id);
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

  get products(): FormArray {
    return this.orderBuyForm.get('products') as FormArray;
  }

  addProduct() {
    const products: FormArray = <FormArray>this.orderBuyForm.get('products');
    products.push(this.productForm());
  }

  removeProduct(index) {
    this.products.removeAt(index);
  }


  saveOrderBuy(orderBuy: Produto) {
    this.subscription =
      this.ordemCompraService.createOrderBuy(orderBuy)
        .subscribe(res => res ? this.sucessoNotification() : this.falhaNotification());
    this.productsSearch$ = Observable.of([]);
    this.initForm();
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
