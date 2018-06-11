
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { ProdutoService, CepService, NotificacaoService } from 'app/shared/services';

import { DadosEndereco, Produto } from 'app/models';
import { propNameQuery } from 'app/shared/utils/StringUtils';

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

  public formEquipamento: FormGroup;
  public formPesquisa: FormGroup;
  public pesquisaControl: FormControl;
  public produtos$: Observable<any[]>;
  public carregando: boolean = true;
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
    this.equipamentoForm();
    this.initFormPesquisa();
    this.atualizaProdutosLazy();
  }

  ngOnChanges(changes) {
    const formEquip = changes.equipamento.currentValue;
    if (formEquip) {
      this.buttonEditar = true;
      this.formEquipamento.patchValue(formEquip);
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
    return this.produtoService.produtosLazyLoad()
      .map(({ produtos }) => {
        return produtos;
      });
  }

  atualizaProdutosLazy() {
    this.produtos$ = this.pesquisaControl.valueChanges
    .debounceTime(500)
    .distinctUntilChanged()
    .switchMap(param => this.loadProdutosLazy(param));
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
  }

  selecionarEquipamento(equipamento: Produto): void {
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
      modelo: ['', Validators.required],
      fabricante: ['', Validators.required],
      numeroSerie: ['', Validators.minLength(4)],
      visita: ['', Validators.required],
      valor: ['', Validators.required],
      imagemPath: '',
      endereco: this.fb.group({
        cep: ['', Validators.required],
        rua: ['', Validators.required],
        bairro: ['', Validators.required],
        numero: ['', Validators.required],
        cidade: ['', Validators.required],
        complemento: [''],
        uf: ['', Validators.required],
        ponto_referencia: ['']
      })
    });
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
