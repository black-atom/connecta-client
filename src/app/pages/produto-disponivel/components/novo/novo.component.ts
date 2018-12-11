import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription, Observable } from 'rxjs/Rx';

import {
  NotificacaoService,
  OrdemCompraService,
  ProdutoService,
  EstoqueService,
  ProdutoDisponivelService } from './../../../../shared/services';

import { Produto } from './../../../../models/produto.interface';
import { categoriaProdutos } from './../../../../utils/mocks/equipamentos';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.scss']
})
export class NovoComponent implements OnInit, OnDestroy {

  public id;
  private subscription: Subscription;
  public orderBuy$: Observable<any>;
  public produtoDisponivelForm: FormGroup;
  public productsAvailables$: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private notificacaoService: NotificacaoService,
    private ordemCompraService: OrdemCompraService,
    private produtoDisponivelService: ProdutoDisponivelService,
    private estoqueService: EstoqueService
  ) { }

  ngOnInit() {
    this.initForm();
    this.obterId();
    this.getOrderBuy();
    this.getProductsAvailables();
  }

  initForm() {
    this.produtoDisponivelForm = this.fb.group({
      productsAvailables: this.fb.array([])
    });
  }

  productForm(product) {
    return this.fb.group({
      description: [product.description, Validators.required],
      productID: [product.productID, Validators.required],
      serialNumber: ['', Validators.required],
      available: [true, Validators.required],
      buyID: [product.buyID, Validators.required],
      baseStock: [product.baseStock, Validators.required],
      origin: [product.origin, Validators.required],
      originID: [product.originID, Validators.required],
      status: ['disponivel', Validators.required],
      quantity: [product.quantity, Validators.required],
      type: [product.type, Validators.required]
    });
  }

  obterId() {
    this.subscription = this.activatedRoute.params
      .subscribe(params => this.id = params['id']);
  }

  get productsFormArray() {
    return this.produtoDisponivelForm.get('productsAvailables') as FormArray;
  }

  getProductsAvailables() {
    this.productsAvailables$ =
      this.produtoDisponivelService.getProdutosAvailables(0, 0, { originID: this.id })
      .map(({ productsAvaiables }) => productsAvaiables);
  }

  getOrderBuy() {
    this.orderBuy$ = this.estoqueService.getAllTransactionStockByIDOrder(this.id).map(response => {
      response.products.map(product => this.productsFormArray.push(this.productForm(product)));
      return response;
    });
  }

  saveSerialNumberProducts(productsForm) {
    const productsWithSerial = productsForm.productsAvailables.filter(product => product.serialNumber.length >= 4);
    const products = {
      orderBuyID: this.id,
      productsAvailables: productsWithSerial
    };
    if (products.productsAvailables.length > 0) {
      this.estoqueService.postTransactionsStock(products).subscribe(res => {
        if (res) {
          this.initForm();
          this.getOrderBuy();
          this.getProductsAvailables();
          this.sucessoNotification();
        }
        return this.getOrderBuy();
      },
      erro => this.falhaNotification());
    }
  }

  sucessoNotification() {
    this.notificacaoService.notificarSucesso(
      'Adicionado N serial com com sucesso!',
      ''
    );
  }

  falhaNotification() {
    this.notificacaoService.notificarErro(
      'Serial inválido ou duplicado!',
      ''
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
