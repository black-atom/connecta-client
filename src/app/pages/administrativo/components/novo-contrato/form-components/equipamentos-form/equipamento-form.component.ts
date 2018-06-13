
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { ProdutoService, CepService, NotificacaoService } from 'app/shared/services';

import { DadosEndereco, Produto } from 'app/models';

@Component({
  selector: 'app-form-equip',
  templateUrl: './equipamento-form.component.html',
  styleUrls: ['./equipamento-form.component.scss']
})
export class EquipamentoFormComponent implements OnInit, OnChanges {

  @Input()
  equipamento;

  @Input()
  indexProposta: number;

  @Input()
  indexEquipamento: number;

  @Output()
  editEquipamento = new EventEmitter();

  @Output()
  sendEquipamento = new EventEmitter();

  public produtos;
  public formEquipamento: FormGroup;
  public formPesquisa: FormGroup;
  public pesquisaControl: FormControl;
  public carregando: boolean = true;
  public primeiroGet: boolean = true;
  public buttonEditar: boolean = false;
  public equipamentoSelecionado: boolean = false;
  public mascaraCep = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public totalRecords;

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private produtoService: ProdutoService,
    private notificacaoService: NotificacaoService
  ) { }

  ngOnInit() {
    this.buttonEditar = false;
    this.equipamentoSelecionado = false;
    this.initFormPesquisa();
    this.equipamentoForm();
    this.atualizaProdutosLazy();
    this.getProdutos();
  }

  ngOnChanges(changes) {
    this.initFormPesquisa();
    this.equipamentoForm();
    const formEquip = changes.equipamento.currentValue;
    if (formEquip) {
      this.buttonEditar = true;
      this.equipamentoSelecionado = true;
      this.formEquipamento.patchValue(formEquip);
      this.ativaEndereco(this.formEquipamento.get('visita').value);
    }
  }

  initFormPesquisa() {
    this.pesquisaControl = this.fb.control('');
    this.formPesquisa = this.fb.group({
      pesquisaControl: this.pesquisaControl
    });
  }


  loadProdutosLazy(event) {
    const query = { descricao: event };
    return this.produtoService
    .produtosLazyLoad(0, 10, query)
    .map(({ produtos, count }) => {
      this.totalRecords = count;
      this.carregando = false;
      return produtos;
    });
  }

  getProdutos() {
    this.produtoService.produtosLazyLoad(0, 10, {})
    .subscribe(({ produtos }) => this.produtos = produtos);
  }

  atualizaProdutosLazy() {
    this.pesquisaControl.valueChanges
    .debounceTime(500)
    .distinctUntilChanged()
    .switchMap(param => this.loadProdutosLazy(param))
    .subscribe(produtos => this.produtos = produtos);
  }

  salvarEquipamento() {
    const indexProposta = this.indexProposta;
    const equipamento = this.formEquipamento.value;
    this.sendEquipamento.emit({ equipamento, indexProposta });
    this.resetForm();
    this.notificarAdicionadoSucesso();
  }

  editarEquipamento() {
    this.buttonEditar = false;
    this.equipamentoSelecionado = false;
    this.editEquipamento.emit({
      equipamento: this.formEquipamento.value,
      indexEquipamento: this.indexEquipamento,
      indexProposta: this.indexProposta
    });
    this.resetForm();
    this.notificarEditadoSucesso();
  }

  resetForm() {
    this.equipamentoForm();
    this.buttonEditar = false;
    this.equipamentoSelecionado = false;
    this.ativaEndereco(false);
  }

  selecionarEquipamento(equipamento: Produto): void {
    this.formEquipamento.get('descricao').patchValue(equipamento.descricao);
    this.formEquipamento.get('categoria').patchValue(equipamento.categoria);
    this.formEquipamento.get('modelo').patchValue(equipamento.modelo);
    this.formEquipamento.get('fabricante').patchValue(equipamento.marca);
    this.formEquipamento.get('imagemPath').patchValue(equipamento.imagemURL);
    this.formEquipamento.markAsDirty();
    this.equipamentoSelecionado = true;
  }

  buscaPorCep(cep: string): void {
    if (cep) {
      const enderecoForm = this.formEquipamento.get('endereco');
      this.cepService.obterInfoEndereco(cep).subscribe((dados: DadosEndereco) => {
        if (dados) {
          enderecoForm.get('rua').patchValue(dados.logradouro);
          enderecoForm.get('bairro').patchValue(dados.bairro);
          enderecoForm.get('cidade').patchValue(dados.localidade);
          enderecoForm.get('uf').patchValue(dados.uf);
        }
      });
    }
  }

  equipamentoForm(): void {
    this.formEquipamento = this.fb.group({
      descricao: ['', Validators.required],
      categoria: ['', Validators.required],
      modelo: ['', Validators.required],
      fabricante: ['', Validators.required],
      visita: ['', Validators.required],
      valor: ['', Validators.required],
      numeroSerie: '',
      imagemPath: '',
      endereco: this.fb.group({
        cep: [{ value: '', disabled: true }, Validators.required],
        rua: [{ value: '', disabled: true }, Validators.required],
        bairro: [{ value: '', disabled: true }, Validators.required],
        numero: [{ value: '', disabled: true }, Validators.required],
        cidade: [{ value: '', disabled: true }, Validators.required],
        complemento: [{ value: '', disabled: true }],
        uf: [{ value: '', disabled: true }, Validators.required],
        ponto_referencia: [{ value: '', disabled: true }]
      })
    });
  }

  ativaEndereco(value) {
    if (value) {
      this.formEquipamento.get('endereco.cep').enable();
      this.formEquipamento.get('endereco.rua').enable();
      this.formEquipamento.get('endereco.bairro').enable();
      this.formEquipamento.get('endereco.numero').enable();
      this.formEquipamento.get('endereco.cidade').enable();
      this.formEquipamento.get('endereco.complemento').enable();
      this.formEquipamento.get('endereco.uf').enable();
      this.formEquipamento.get('endereco.ponto_referencia').enable();
    } else {
      this.formEquipamento.get('endereco.cep').disable();
      this.formEquipamento.get('endereco.rua').disable();
      this.formEquipamento.get('endereco.bairro').disable();
      this.formEquipamento.get('endereco.numero').disable();
      this.formEquipamento.get('endereco.cidade').disable();
      this.formEquipamento.get('endereco.complemento').disable();
      this.formEquipamento.get('endereco.uf').disable();
      this.formEquipamento.get('endereco.ponto_referencia').disable();

      this.formEquipamento.get('endereco.cep').setValue('');
      this.formEquipamento.get('endereco.rua').setValue('');
      this.formEquipamento.get('endereco.bairro').setValue('');
      this.formEquipamento.get('endereco.numero').setValue('');
      this.formEquipamento.get('endereco.cidade').setValue('');
      this.formEquipamento.get('endereco.complemento').setValue('');
      this.formEquipamento.get('endereco.uf').setValue('');
      this.formEquipamento.get('endereco.ponto_referencia').setValue('');
    }
  }

  desabilita() {
    this.formEquipamento.get('endereco.cep').disable();
    this.formEquipamento.get('endereco.rua').disable();
    this.formEquipamento.get('endereco.bairro').disable();
    this.formEquipamento.get('endereco.numero').disable();
    this.formEquipamento.get('endereco.cidade').disable();
    this.formEquipamento.get('endereco.complemento').disable();
    this.formEquipamento.get('endereco.uf').disable();
    this.formEquipamento.get('endereco.ponto_referencia').disable();
  }

  notificarAdicionadoSucesso() {
    this.notificacaoService.notificarSucesso('Produto adicionado com sucesso!', '');
  }

  notificarCepNaoEncontrado() {
    this.notificacaoService.notificarAviso('O Cep não encontrado!', 'Tente novamento.');
  }

  notificarEditadoSucesso() {
    this.notificacaoService.notificarSucesso('Produto editado com sucesso!', '');
  }

}
