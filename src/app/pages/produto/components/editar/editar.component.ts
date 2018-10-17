import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Produto } from './../../../../models/produto.interface';
import { ProdutoService, NotificacaoService } from 'app/shared/services';
import { categoriaProdutos } from '../../../../utils/mocks/equipamentos';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit, OnDestroy {

  public id;
  public formProduto: FormGroup;
  private subscription: Subscription;
  public categoryProducts = categoriaProdutos;
  public produtoRecebido: Produto;

  constructor(
    private activatedRoute: ActivatedRoute,
    private produtoService: ProdutoService,
    private notificacaoService: NotificacaoService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.obterIdProduto();
    this.getProduto();
  }

  obterIdProduto() {
    this.subscription = this.activatedRoute.params
      .subscribe(params => this.id = params['id']);
  }

  initForm() {
    return this.formProduto = this.fb.group({
      description: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      serialControl: [false, Validators.required],
      productCode: ['', Validators.required],
      buyPrice: [''],
      sellPrice: ['']
    });
  }

  pecaForm() {
    return this.fb.group({
      descricao: ['', Validators.required],
      valor: ['', Validators.required]
    });
  }

  getProduto() {
    this.subscription = this.produtoService.getProduto(this.id).subscribe(produto => {
      const { description, brand, category, serialControl, sellPrice, buyPrice, productCode } = produto;
      this.formProduto.get('description').patchValue(description);
      this.formProduto.get('brand').patchValue(brand);
      this.formProduto.get('category').patchValue(category);
      this.formProduto.get('serialControl').patchValue(serialControl);
      this.formProduto.get('productCode').patchValue(productCode);
      this.formProduto.get('sellPrice').patchValue(sellPrice);
      this.formProduto.get('buyPrice').patchValue(buyPrice);
      this.produtoRecebido = produto;
    });

  }

  parserBoolean(value) {
    if (value === 'false' || value === false) {
      return false;
    }
    return true;
  }

  editarProduto(produto: Produto) {
    const parseProduct = {
      ...this.produtoRecebido,
      description: produto.description.toUpperCase(),
      category: produto.category.toUpperCase(),
      brand: produto.brand.toUpperCase(),
      serialControl: this.parserBoolean(produto.serialControl),
      productCode: produto.productCode
    };
    this.subscription = this.produtoService.editarProduto(parseProduct)
      .subscribe(res => res ? this.sucessoNotification() : this.falhaNotification());
  }

  sucessoNotification() {
    this.notificacaoService.notificarSucesso(
      'Produto editado com sucesso',
      ''
    );
  }

  falhaNotification() {
    this.notificacaoService.notificarErro(
      'Não foi possível editar o produto',
      ''
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
