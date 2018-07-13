import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter
} from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { removeMaskFromProp } from 'app/shared/utils/StringUtils';

import {
  ProdutoService,
  CepService,
  NotificacaoService
} from 'app/shared/services';

import {
  DadosEndereco,
  Produto,
  Cliente
} from 'app/models';

@Component({
  selector: 'app-form-equip',
  templateUrl: './equipamento-form.component.html',
  styleUrls: ['./equipamento-form.component.scss']
})
export class EquipamentoFormComponent implements OnInit, OnChanges {

  @Input()
  public contrato: FormGroup;

  @Input() equipamento;

  @Input()
  public indexEquipamento: number;

  @Output()
  editEquipamento = new EventEmitter();

  @Output()
  sendEquipamento = new EventEmitter();

  public produtos$: Observable<any[]>;
  public formEquipamento: FormGroup;
  public buttonEditar: boolean = false;
  public mascaraCep = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];


  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private produtoService: ProdutoService,
    private notificacaoService: NotificacaoService,
  ) { }

  ngOnInit() {
    this.equipamentoForm();
    this.getProdutos();
  }

  ngOnChanges(changes) {
    this.equipamentoForm();
    const equipamento = changes.equipamento.currentValue;
    if (equipamento) {
      this.buttonEditar = true;
      this.formEquipamento.patchValue(equipamento);
    }
  }

  loadProdutosLazy = (event) => {
    const query = { descricao: event };
    return this.produtos$ = this.produtoService
      .produtosLazyLoad(0, 10, query)
      .map(({ produtos }) => produtos);
  }

  getProdutos = () => {
    return this.produtos$ = this.produtoService
      .produtosLazyLoad(0, 10, {})
      .map(({ produtos }) => produtos);
  }

  sendEquipamentoForm(equipamento, type) {
    return type === 'add'
      ? this.add({ equipamento, type })
      : this.edit({ equipamento: { ...equipamento, indexEquipamento: this.equipamento.indexEquipamento }, type });
  }

  add(equipamento) {
    this.sendEquipamento.emit(equipamento);
    this.resetForm();
    this.notificarAdicionadoSucesso();
  }

  edit(equipamento) {
    this.sendEquipamento.emit(equipamento);
    this.resetForm();
    this.notificarEditadoSucesso();
  }

  resetForm() {
    this.equipamentoForm();
    this.buttonEditar = false;
  }

  selecionarEquipamento(equipamento: Produto): void {
    this.formEquipamento.get('descricao').patchValue(equipamento.descricao);
    this.formEquipamento.get('categoria').patchValue(equipamento.categoria);
    this.formEquipamento.get('modelo').patchValue(equipamento.modelo);
    this.formEquipamento.get('fabricante').patchValue(equipamento.marca);
    this.formEquipamento.get('imagemPath').patchValue(equipamento.imagemURL);
    this.formEquipamento.markAsDirty();
  }

  buscaPorCep(cep: string): void {
    const enderecoForm = this.formEquipamento.get('endereco') as FormGroup;
    const cepIsValid = removeMaskFromProp('cep')(enderecoForm.value);
    if (cepIsValid.length === 8) {
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

  returnRazaoSocial(cnpj) {
    const cnpjAssociados = this.contrato.get('cnpjAssociados').value;
    const cliente = this.contrato.get('cliente').value;
    const clientes = [cliente, ...cnpjAssociados];
    return clientes.find(c => c.cnpj_cpf === cnpj).nome_razao_social;
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
      cnpjCliente: ['', Validators.required],
      endereco: this.fb.group({
        cep: [''],
        rua: [''],
        bairro: [''],
        numero: [''],
        cidade: [''],
        complemento: [''],
        uf: [''],
        ponto_referencia: ['']
      })
    });
  }

  notificarAdicionadoSucesso() {
    this.notificacaoService.notificarSucesso('Produto adicionado com sucesso!', '');
  }

  notificarEditadoSucesso() {
    this.notificacaoService.notificarSucesso('Produto editado com sucesso!', '');
  }

}
