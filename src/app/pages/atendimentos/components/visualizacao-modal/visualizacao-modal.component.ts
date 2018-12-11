import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Atendimento } from './../../../../models/atendimento.interface';
import {
  EstoqueService,
  ProdutoDisponivelService,
  ProdutoReservadoService,
  NotificacaoService
} from 'app/shared/services';

@Component({
  selector: 'app-visualizacao-modal',
  templateUrl: './visualizacao-modal.component.html',
  styleUrls: ['./visualizacao-modal.component.scss']
})
export class VisualizacaoModalComponent implements OnInit, OnDestroy {

@Input()
atendimentoSelecionado: Atendimento;
productForm: FormGroup;
productsSearch$: Observable<any[]>;
public productsReserved$: Observable<any[]>;
private subscription: Subscription;
public tabActived = 'atendimento';

  constructor(
    public modalAtiva: NgbActiveModal,
    private fb: FormBuilder,
    private estoqueService: EstoqueService,
    private notificacaoService: NotificacaoService,
    private productsAvailablesService: ProdutoDisponivelService,
    private produtoReservadoService: ProdutoReservadoService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getProductsReserved();
  }

  searchProduct(description) {
    const baseStock = this.productForm.get('baseStock').value;
    if (description.length > 4) {
      this.productsSearch$ = this.estoqueService
      .getAllTransactionsStock(0, 1, { description, baseStock })
        .switchMap(({ stockTransactions }) => {
          return this.productsAvailablesService.getProdutosAvailables(0, 1, { description, status: 'disponivel', baseStock })
          .map(({ productsAvaiables }) => {
            return stockTransactions.map(produto => {
              if (productsAvaiables.length > 0 && produto.productID === productsAvaiables[0].productID) {
                return {
                  ...produto,
                  serialNumber: productsAvaiables[0].serialNumber,
                  _id: productsAvaiables[0]._id,
                  status: productsAvaiables[0].status
                };
              }
              if (produto.serialControl) {
                return { ...produto, status: 'Produto Indisponível' };
              }
              return { ...produto, serialNumber: '', status: 'Disponível' };
            });
          });
        });
    }
  }

  productSelected(product) {
   if (product.status !== 'Produto Indisponível') {
    this.productForm.get('description').patchValue(product.description);
    this.productForm.get('serialNumber').patchValue(product.serialNumber);
    this.productForm.get('serialControl').patchValue(product.serialControl);
    this.productForm.get('productID').patchValue(product.productID);
    this.productForm.get('baseStock').patchValue(product.baseStock);
    this.productForm.get('originID').patchValue(this.atendimentoSelecionado._id);
    this.productForm.get('_id').patchValue(product._id);
    if (product.serialControl && product.serialNumber !== 0) {
      this.subscription = this.productsAvailablesService
        .updateProductAvailable(product._id, { status: 'pre-reservado' })
        .subscribe(res => res);
    }

    return this.productsSearch$ = Observable.of([]);
   }

   this.productForm.get('description').patchValue('');
   return this.productsSearch$ = Observable.of([]);
  }

  fecharModal() {
    this.modalAtiva.close();
  }

  getProductsReserved() {
    return this.productsReserved$ = this.produtoReservadoService
      .getProductReserved(this.atendimentoSelecionado._id)
      .map(productsReserved =>
        productsReserved.filter(product => product.status === 'reservado')
      );
  }

  initForm() {
    this.productForm = this.fb.group({
      description: ['', Validators.required],
      serialNumber: [''],
      serialControl: ['', Validators.required],
      productID: [''],
      baseStock: ['', Validators.required],
      quantity: [1, Validators.required],
      origin: ['atendimento'],
      type: ['saida'],
      originID: ['', Validators.required],
      _id: ['', Validators.required]
    });
  }

  getTab(tabSelecionada) {
    this.tabActived = tabSelecionada;
  }

  cleanForm() {
    this.productForm.get('description').patchValue('');
    this.productForm.get('serialNumber').patchValue('');
    this.productForm.get('serialControl').patchValue('');
    this.productForm.get('productID').patchValue('');
  }

  addProduct(product) {
    const productFormat = {
      ...product,
      status: 'reservado',
      dateOut: this.atendimentoSelecionado.data_atendimento,
      quantity: product.serialControl ? 1 : product.quantity
    };

    if (product.serialControl === true && product.serialNumber === 0) {
      return this.falhaNotification();
    }


    this.subscription = this.produtoReservadoService
      .postProductReserved(productFormat)
      .subscribe(res => {
        if (res) {
          this.getProductsReserved();
          this.cleanForm();
        }
      });
  }

  falhaNotification() {
    this.notificacaoService.notificarErro(
      'Produto não disponível!',
      ''
    );
  }

  updatedProductReservad(product) {
    const productReserved = {
      _id: product._id,
      serialControl: product.serialControl,
      serialNumber: product.serialNumber,
      statusProductReserved: 'cancelado',
      statusProductAvailable: 'disponivel'
    };

    this.produtoReservadoService
      .putProductReserved(productReserved)
      .subscribe(res => this.getProductsReserved());


  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
