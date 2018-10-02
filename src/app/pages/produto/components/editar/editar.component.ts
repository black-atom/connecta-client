import { ModalImagemComponent } from './../modal-imagem/modal-imagem.component';
import { Observable } from 'rxjs/Observable';
import { NotificacaoService } from './../../../../shared/services/notificacao-service/notificacao.service';
import { Produto } from './../../../../models/produto.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProdutoService } from 'app/shared/services';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { categoriaProdutos } from '../../../../utils/mocks/equipamentos';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit, OnDestroy {

  public id;
  public formProduto: FormGroup;
  private subscription: Subscription;
  public categoriaProdutos = categoriaProdutos;
  public produtoRecebido: Produto;
  public pecasProduto$: Observable<Produto[]>;

  public opcoesModal: NgbModalOptions = {
    size: 'lg'
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private produtoService: ProdutoService,
    private notificacaoService: NotificacaoService,
    private servicoModal: NgbModal,
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

  getProduto() {
    this.subscription = this.produtoService.getProduto(this.id).subscribe(produto => {
      const { pecas, descricao, modelo, marca, valor, categoria, imagemURL } = produto;
      this.formProduto.get('descricao').patchValue(descricao);
      this.formProduto.get('modelo').patchValue(modelo);
      this.formProduto.get('categoria').patchValue(categoria);
      this.formProduto.get('marca').patchValue(marca);
      this.formProduto.get('valor').patchValue(valor);
      this.formProduto.get('imagemURL').patchValue(imagemURL);

      pecas.forEach( () => this.adicionarPeca() );
      this.formProduto.controls['pecas'].patchValue(pecas);
      this.produtoRecebido = produto;

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

  removerPeca(index) {
    this.pecas.removeAt(index);
    this.pecasProduto$ = Observable.of([]);
  }

  editarProduto(produto: Produto) {
    this.subscription = this.produtoService.editarProduto({ ...this.produtoRecebido, ...produto })
      .subscribe(res => res ? this.sucessoNotification() : this.falhaNotification());
      this.pecasProduto$ = Observable.of([]);
  }

  removeFoto(produto: Produto) {
    this.subscription = this.produtoService.editarProduto({ ...this.produtoRecebido, ...{ ...produto, imagemURL: null } })
      .subscribe(res => {
        res ? this.sucessoNotification() : this.falhaNotification();
        this.produtoRecebido = res;
      });
      this.pecasProduto$ = Observable.of([]);
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

  searchPeca(value) {
    this.pecasProduto$ = this.produtoService
      .pecasLazyLoad( 0, 0, { descricao: value, categoria: 'peça' })
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
    .then(result => result ? this.getProduto() : this.falhaNotification())
    .catch(() => {});
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
