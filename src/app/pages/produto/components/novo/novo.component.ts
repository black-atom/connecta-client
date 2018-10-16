import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs/Rx';

import { NotificacaoService, ProdutoService } from './../../../../shared/services';

import { Produto } from './../../../../models/produto.interface';
import { categoriaProdutos } from './../../../../utils/mocks/equipamentos';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.scss']
})
export class NovoComponent implements OnInit, OnDestroy {

  public formProduto: FormGroup;
  public categoryProducts = categoriaProdutos;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private notificacaoService: NotificacaoService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    return this.formProduto = this.fb.group({
      description: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      serialControl: [false, Validators.required],
      buyPrice: [''],
      sellPrice: ['']
    });
  }

  parserBoolean(value) {
    if (value === 'false' || value === false) {
      return false;
    }
    return true;
  }

  cadastrarProduto(produto: Produto) {
    const parseProduct = {
      ...produto,
      description: produto.description.toUpperCase(),
      category: produto.category.toUpperCase(),
      brand: produto.brand.toUpperCase(),
      serialControl: this.parserBoolean(produto.serialControl)
    };
    this.subscription = this.produtoService.novoProduto(parseProduct)
      .subscribe(res => res ? this.sucessoNotification() : this.falhaNotification());
  }

  sucessoNotification() {
    this.notificacaoService.notificarSucesso(
      'Produto cadastrado com sucesso',
      ''
    );
    this.initForm();
  }

  falhaNotification() {
    this.notificacaoService.notificarErro(
      'Não foi possível efetuar o cadastro',
      ''
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
