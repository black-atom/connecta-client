import { NotificacaoService } from './../../../../shared/services/notificacao-service/notificacao.service';
import { Produto } from './../../../../models/produto.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProdutoService } from 'app/shared/services';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

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
  public categoriaProdutos = categoriaProdutos;
  public produtoRecebido: Produto;
  public pecasProduto;

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
    this.searchPeca();
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
      const { pecas, descricao, modelo, marca, valor, categoria } = produto;
      this.formProduto.get('descricao').patchValue(descricao);
      this.formProduto.get('modelo').patchValue(modelo);
      this.formProduto.get('categoria').patchValue(categoria);
      this.formProduto.get('marca').patchValue(marca);
      this.formProduto.get('valor').patchValue(valor);

      pecas.forEach( () => this.adicionarPeca() );
      this.formProduto.controls['pecas'].patchValue(pecas);
      this.produtoRecebido = produto;
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

  editarProduto(produto: Produto) {
    this.subscription = this.produtoService.editarProduto({ ...this.produtoRecebido, ...produto })
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
