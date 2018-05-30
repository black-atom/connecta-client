import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, Observable } from 'rxjs/Rx';

import { ModalImagemComponent } from './../modal-imagem/modal-imagem.component';
import { NotificacaoService } from './../../../../shared/services/notificacao-service/notificacao.service';
import { ProdutoService } from './../../../../shared/services';

import { Produto } from './../../../../models/produto.interface';
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
  public pecasProduto$: Observable<Produto[]>;

  public opcoesModal: NgbModalOptions = {
    size: 'lg'
  };

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private notificacaoService: NotificacaoService,
    private servicoModal: NgbModal) { }

  ngOnInit() {
    this.initForm();
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

  resetFormArrayPeca(categoria) {
    if (categoria === 'peça' || categoria === 'acessório' || categoria === 'software') {
      return this.formProduto.controls.pecas = this.fb.array([]);
    }
  }

  adicionarPeca() {
    const pecas: FormArray = <FormArray>this.pecas;
    pecas.push(this.pecaForm());
    this.pecasProduto$ = Observable.of([]);
  }

  rebuildForm() {
    this.initForm();
    this.pecasProduto$ = Observable.of([]);
  }

  removerPeca(index) {
    this.pecas.removeAt(index);
    this.pecasProduto$ = Observable.of([]);
  }

  cadastrarProduto(produto: Produto) {
    this.subscription = this.produtoService.novoProduto(produto)
      .subscribe(res => res ? this.abrirModalAnexarImagem(res) : this.falhaNotification() );
      this.pecasProduto$ = Observable.of([]);
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

  searchPeca(value) {
    this.pecasProduto$ = this.produtoService
      .pecasLazyLoad( 0, 5, { descricao: value, categoria: 'peça' })
      .map(({ produtos }) => produtos);
  }

  pecaSelecionada({ descricao, valor }, index) {
    const pecaForm = this.pecas.at(index);
      pecaForm.get('descricao').patchValue(descricao);
      pecaForm.get('valor').patchValue(valor);
    this.pecasProduto$ = Observable.of([]);
  }

  abrirModalAnexarImagem(produto) {
    const referenciaModal = this.servicoModal.open(ModalImagemComponent, this.opcoesModal);
    referenciaModal.componentInstance.produtoSalvo = produto;
    referenciaModal.result
    .then(result => result ? this.sucessoNotification() : this.falhaNotification())
    .catch(() => {});
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
