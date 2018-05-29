import { NotificacaoService } from './../../../../shared/services/notificacao-service/notificacao.service';
import { Subscription } from 'rxjs/Rx';
import { Produto } from './../../../../models/produto.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProdutoService } from './../../../../shared/services';

import { categoriaProdutos } from './../../../../utils/mocks/equipamentos';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.scss']
})
export class NovoComponent implements OnInit, OnDestroy {

  public formProduto: FormGroup;
  public categoriaProdutos = categoriaProdutos;
  private subscription: Subscription;
  public pecasProduto;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private notificacaoService: NotificacaoService) { }

  ngOnInit() {
    this.initForm();
    this.searchPeca();
  }

  initForm() {
    return this.formProduto = this.fb.group({
      descricao: ['', Validators.required],
      modelo: ['', Validators.required],
      categoria: ['', Validators.required],
      marca: ['', Validators.required],
      valor: ['', Validators.required],
      imagemURL: null,
      pecas: this.fb.array([])
    });
  }

  pecaForm() {
    return this.fb.group({
      descricao: ['', Validators.required],
      valor: ['', Validators.required]
    });
  }

  get pecas(): FormArray {
    return this.formProduto.get('pecas') as FormArray;
  }

  adicionarPeca() {
    const pecas: FormArray = <FormArray>this.pecas;
    pecas.push(this.pecaForm());
  }

  rebuildForm() {
    this.initForm();
  }

  removerPeca(index) {
    this.pecas.removeAt(index);
  }

  cadastrarProduto(produto: Produto) {
    this.subscription = this.produtoService.novoProduto(produto)
      .subscribe(res => res ? this.sucessoNotification() : this.falhaNotification() );
  }

  sucessoNotification() {
    this.notificacaoService.notificarSucesso(
      'Produto cadastrado com sucesso',
      ''
    );
    this.rebuildForm();
  }

  falhaNotification() {
    this.notificacaoService.notificarErro(
      'Não foi possível efetuar o cadastro',
      ''
    );
  }

  searchPeca() {
    this.subscription =
      this.produtoService.pecasLazyLoad(0, 0, { categoria: 'peça' })
        .subscribe(({ produtos: pecas }) => this.pecasProduto = pecas);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
