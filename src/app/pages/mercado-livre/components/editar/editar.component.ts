import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MercadoLivreServiceService } from './../../../../shared/services';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  products = [];
  orderSellForm: FormGroup;
  productForm: FormGroup;
  id;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private mercadoLivreServiceService: MercadoLivreServiceService
  ) { }

  ngOnInit() {
    this.obterId();
    this.initForm();
    this.initProductForm();
    this.getMercadoLivrebyId();
  }

  obterId() {
    this.subscription = this.activatedRoute.params
      .subscribe(params => this.id = params['id']);
  }

  getMercadoLivrebyId() {
    this.subscription = this.mercadoLivreServiceService
      .getMercadoLivreByID(this.id)
      .subscribe(orderMercadoLivre => {
        this.products = orderMercadoLivre.productsSell;
        this.orderSellForm.get('dateSell').patchValue(this.parseDataPick(orderMercadoLivre.dateSell));
        this.orderSellForm.get('documentID').patchValue(orderMercadoLivre.documentID);
        this.orderSellForm.get('customerName').patchValue(orderMercadoLivre.customerName);
        this.orderSellForm.get('status').patchValue(orderMercadoLivre.status);
        this.orderSellForm.get('nf').patchValue(orderMercadoLivre.nf);
        this.orderSellForm.get('productsSell').patchValue(orderMercadoLivre.productsSell);
      });
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

  parseDataPick(data) {
    const date = new Date(data);
    const formatoData = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() };
    return formatoData;
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


  initProductForm() {
    this.productForm = this.fb.group({
      description: [''],
      serialNumber: [''],
      quantity: [1],
      buyPrice: [''],
      tarifMercadoLivre: [''],
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

  saveOrderSell(orderSell) {
    this.mercadoLivreServiceService.createOrderSell(orderSell).subscribe(res => console.log(res));
  }

}
