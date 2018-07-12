import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProdutoService, CepService, NotificacaoService } from 'app/shared/services';
import { removeMaskFromProp } from 'app/shared/utils/StringUtils';

import { DadosEndereco, Produto, Cliente } from 'app/models';
import { ModalEdicaoComponent } from '../modal-edicao/modal-edicao.component';

@Component({
  selector: 'app-form-equip',
  templateUrl: './equipamento-form.component.html',
  styleUrls: ['./equipamento-form.component.scss']
})
export class EquipamentoFormComponent implements OnInit {

  @Input()
  public contrato: FormGroup;

  @Input()
  public equipamento;

  @Input()
  public indexProposta: number;

  @Input()
  public indexEquipamento: number;

  @Input()
  public isNovoContrato;

  @Output()
  editEquipamento = new EventEmitter();

  @Output()
  sendEquipamento = new EventEmitter();

  public produtos$: Observable<any[]>;
  public formEquipamento: FormGroup;
  public formPesquisa: FormGroup;
  public pesquisaControl: FormControl;
  public carregando: boolean = true;
  public primeiroGet: boolean = true;
  public buttonEditar: boolean = false;
  public equipamentoSelecionado: boolean = false;
  public mascaraCep = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];


  constructor(
    private fb: FormBuilder,
    // private cepService: CepService,
    private produtoService: ProdutoService,
    // private notificacaoService: NotificacaoService,
    // private modalService: NgbModal
  ) { }

  ngOnInit() {
    // this.buttonEditar = false;
    // this.equipamentoSelecionado = false;
    // this.equipamentoForm();
    // this.atualizaProdutosLazy();
    this.getProdutos();
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


  // salvarEquipamento() {
  //   const indexProposta = this.indexProposta;
  //   const equipamento = this.formEquipamento.value;
  //   this.sendEquipamento.emit({ equipamento, indexProposta });
  //   this.resetForm();
  //   this.notificarAdicionadoSucesso();
  // }

  // editarEquipamento(equipamento) {
  //   this.buttonEditar = false;
  //   this.equipamentoSelecionado = false;
  //   this.editEquipamento.emit({
  //     equipamento,
  //     indexEquipamento: this.indexEquipamento,
  //     indexProposta: this.indexProposta
  //   });
  //   this.resetForm();
  //   this.notificarEditadoSucesso();
  // }

  // resetForm() {
  //   this.equipamentoForm();
  //   this.buttonEditar = false;
  //   this.equipamentoSelecionado = false;
  // }

  // selecionarEquipamento(equipamento: Produto): void {
  //   this.formEquipamento.get('descricao').patchValue(equipamento.descricao);
  //   this.formEquipamento.get('categoria').patchValue(equipamento.categoria);
  //   this.formEquipamento.get('modelo').patchValue(equipamento.modelo);
  //   this.formEquipamento.get('fabricante').patchValue(equipamento.marca);
  //   this.formEquipamento.get('imagemPath').patchValue(equipamento.imagemURL);
  //   this.formEquipamento.markAsDirty();
  //   this.equipamentoSelecionado = true;
  // }

  // buscaPorCep(cep: string): void {
  //   const enderecoForm = this.formEquipamento.get('endereco') as FormGroup;
  //   const cepIsValid = removeMaskFromProp('cep')(enderecoForm.value);
  //   if (cepIsValid.length === 8) {
  //     this.cepService.obterInfoEndereco(cep).subscribe((dados: DadosEndereco) => {
  //       if (dados) {
  //         enderecoForm.get('rua').patchValue(dados.logradouro);
  //         enderecoForm.get('bairro').patchValue(dados.bairro);
  //         enderecoForm.get('cidade').patchValue(dados.localidade);
  //         enderecoForm.get('uf').patchValue(dados.uf);
  //       }
  //     });
  //   }
  // }

  // filterTodosClientes(): Cliente[] {
  //   const cnpjAssociados = this.contrato.get('cnpjAssociados').value;
  //   const cliente = this.contrato.get('cliente').value;
  //   return [cliente, ...cnpjAssociados];
  // }

  // returnRazaoSocial(cnpj: string): string {
  //   const clientesDoContrato: Cliente[] = this.filterTodosClientes();
  //   const nomeCliente = clientesDoContrato.filter(cliente => cliente.cnpj_cpf === cnpj)[0];
  //   return nomeCliente.nome_razao_social;
  // }

  // equipamentoForm(): void {
  //   this.formEquipamento = this.fb.group({
  //     descricao: ['', Validators.required],
  //     categoria: ['', Validators.required],
  //     modelo: ['', Validators.required],
  //     fabricante: ['', Validators.required],
  //     visita: ['', Validators.required],
  //     valor: ['', Validators.required],
  //     numeroSerie: '',
  //     imagemPath: '',
  //     cnpjCliente: ['', Validators.required],
  //     endereco: this.fb.group({
  //       cep: [''],
  //       rua: [''],
  //       bairro: [''],
  //       numero: [''],
  //       cidade: [''],
  //       complemento: [''],
  //       uf: [''],
  //       ponto_referencia: ['']
  //     })
  //   });
  // }

  // notificarAdicionadoSucesso() {
  //   this.notificacaoService.notificarSucesso('Produto adicionado com sucesso!', '');
  // }

  // notificarCepNaoEncontrado() {
  //   this.notificacaoService.notificarAviso('O Cep não encontrado!', 'Tente novamento.');
  // }

  // notificarEditadoSucesso() {
  //   this.notificacaoService.notificarSucesso('Produto editado com sucesso!', '');
  // }

  // pathMotivo(equipamento) {
  //   this.formEquipamento.value.patchValue(equipamento);
  // }

  // openModalEdicao(equipamento) {
  //   switch (this.isNovoContrato) {
  //     case false:
  //       const referenciaModal = this.modalService.open(
  //         ModalEdicaoComponent
  //       );
  //       referenciaModal.componentInstance.equipamento = equipamento;
  //       referenciaModal.componentInstance.showEncerradoEm = false;
  //       referenciaModal.result.then(resultadoDaModal => {
  //         if (resultadoDaModal) {
  //           this.editarEquipamento(resultadoDaModal);
  //         }
  //       }).catch(error => error);
  //       break;
  //     case true: {
  //       this.editarEquipamento(this.formEquipamento.value);
  //     }
  //   }
  // }

}
