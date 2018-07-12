import { OnInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { equals } from 'ramda';

import { ClienteService, NotificacaoService, ContratoService } from 'app/shared/services';
import { removeMaskFromProp } from 'app/shared/utils/StringUtils';

import { Cliente } from 'app/models';

@Component({
  selector: 'app-novo-contrato',
  templateUrl: './novo-contrato.component.html',
  styleUrls: ['./novo-contrato.component.scss']
})
export class NovoContratoComponent implements OnInit {

  public equipamento;
  public qtdEquipamentos;
  public valorTotalContrato;
  public indexEquipamento;
  public novoContratoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private contratoService: ContratoService,
    private notificacaoService: NotificacaoService
  ) { }

  ngOnInit() {
    this.initContratoForm();
  }

  initContratoForm() {
    this.novoContratoForm = this.fb.group({
      cliente: this.clienteForm(),
      cnpjAssociados: this.fb.array([]),
      contato: this.contatoForm(),
      endereco: this.enderecoForm(),
      propostas: this.fb.array([this.propostaForm()]),
      numeroContrato: ['', [Validators.required, Validators.maxLength(60)]],
      dataAdesao: ['', Validators.required],
      diaVencimento: ['', Validators.required],
      subsequente: ['', Validators.required],
      tipo: ['', Validators.required],
      ativo: [true, Validators.required],
      resumoContrato: ['']
    });
  }

  clienteForm = (): FormGroup => {
    return this.fb.group({
      nome_razao_social: ['', Validators.required],
      cnpj_cpf: ['', [Validators.required, Validators.minLength(11)]],
      inscricao_estadual: [''],
      nome_fantasia: ['']
    });
  }

  contatoForm = (): FormGroup => {
    return this.fb.group({
      email: ['', Validators.required],
      nome: [''],
      telefone: ['', Validators.required],
      celular: ['']
    });
  }

  enderecoForm = (): FormGroup => {
    return this.fb.group({
      cep: [''],
      rua: [''],
      bairro: [''],
      numero: [''],
      cidade: [''],
      complemento: [''],
      uf: [''],
      ponto_referencia: ['']
    });
  }

  equipamentoForm = (): FormGroup => {
    return this.fb.group({
      descricao: ['', Validators.required],
      cnpjCliente: ['', Validators.required],
      categoria: ['', Validators.required],
      modelo: ['', Validators.required],
      fabricante: ['', Validators.required],
      numeroSerie: [''],
      visita: ['', Validators.required],
      valor: ['', Validators.required],
      imagemPath: [''],
      endereco: this.enderecoForm()
    });
  }

  propostaForm = (): FormGroup => {
    return this.fb.group({
      valor: 0,
      equipamentos: this.fb.array([]),
      ativo: true
    });
  }

  get propostas(): FormArray {
    return this.novoContratoForm.get('propostas') as FormArray;
  }

  get cnpjAssociados(): FormArray {
    return this.novoContratoForm.get('cnpjAssociados') as FormArray;
  }

  getCliente({ cnpj, tipo, index }) {

    if (this.validaVincular(cnpj)) {
      return this.notificarFalhaAssosiar();
    }

    return this.clienteService.retornarUm(cnpj)
      .subscribe((cliente) => {

        if (cliente) {
          if (tipo === 'principal') {
            return this.setClienteForm(cliente);
          }
          return this.setClienteFormAssociado(cliente, index);
        }

        return this.notificarFalhaEncontrarCliente();

      });
  }

  setClienteForm = (cliente) => {
    this.novoContratoForm.get('cliente').patchValue(cliente);
    this.novoContratoForm.get('contato').patchValue(cliente.contatos[0]);
    this.novoContratoForm.get('endereco').patchValue(cliente.enderecos[0]);
  }

  setClienteFormAssociado = (cliente, index) => {
    return this.cnpjAssociados.at(index).patchValue(cliente);
  }

  validaVincular = (cnpj) => {
    const noExistCnpjAssociation = this.cnpjAssociados.value.find(cliente => equals(cliente.cnpj_cpf, cnpj));
    const isExistCnpj = equals(cnpj, this.novoContratoForm.get('cliente').value.cnpj_cpf);
    return !!isExistCnpj || noExistCnpjAssociation;
  }

  actionsForm = ({ actionType, index }) => {
    return (actionType === 'add') ? this.adicionarCampoVincularCnpj() : this.removerCnpj(index);
  }

  adicionarCampoVincularCnpj = () => {
    const cnpjAssociados = <FormArray> this.cnpjAssociados;
    cnpjAssociados.push(this.clienteForm());
  }

  removerCnpj = (index) => {
    const cnpjAssociados = <FormArray> this.cnpjAssociados;
    cnpjAssociados.removeAt(index);
  }

  // addEquipamento({ equipamento, indexProposta: index }) {
  //   const equipamentos = (<FormArray>this.propostas.at(index).get('equipamentos')) as FormArray;
  //   equipamentos.push(this.equipamentoForm());
  //   this.calculaValorTotalContrato(index, equipamentos.value);
  //   (<FormArray>this.propostas.at(index).get('valor')).setValue(this.valorTotalContrato);
  //   this.qtdEquipamentos = equipamentos.value.length;
  // }

  // editarEquipamento({ equipamento, indexEquipamento, indexProposta: index }) {
  //   const equipamentos = (<FormArray>this.propostas.at(index).get('equipamentos')) as FormArray;
  //   equipamentos.at(indexEquipamento).patchValue(equipamento);
  //   this.calculaValorTotalContrato(index, equipamentos.value);
  //   (<FormArray>this.propostas.at(index).get('valor')).setValue(this.valorTotalContrato);
  //   this.qtdEquipamentos = equipamentos.value.length;
  // }

  // removeEquipamento({ indexEquipamento, indexProposta: index }) {
  //   const equipamentos = (<FormArray>this.propostas.at(index).get('equipamentos')) as FormArray;
  //   equipamentos.removeAt(indexEquipamento);
  //   this.calculaValorTotalContrato(index, equipamentos.value);
  //   (<FormArray>this.propostas.at(index).get('valor')).setValue(this.valorTotalContrato);
  //   this.qtdEquipamentos = equipamentos.value.length;
  // }

  // getEquipamentoEdit({ equipamento, index }) {
  //   this.equipamento = equipamento;
  //   this.indexEquipamento = index;
  // }

  // resetForm() {
  //   this.cnpjBuscar = '';
  //   this.qtdEquipamentos = 0;
  //   this.valorTotalContrato = 0;
  //   this.initContratoForm();
  // }

  // calculaValorTotalContrato(index, equipamentos) {
  //   this.valorTotalContrato = equipamentos.reduce((total, equipamento) => {
  //     return total + equipamento.valor;
  //   }, 0);
  // }

  // cadastrarContrato() {
  //   const contratoFormatado = this.replaceFieldsContrato(this.novoContratoForm.value);
  //   this.contratoService.novoContrato(contratoFormatado)
  //   .subscribe(
  //     () => {},
  //     erro => this.notificarFalhaCadastro(),
  //       () => {
  //         this.resetForm();
  //         this.notificarSucesso();
  //       }
  //   );
  // }

  replaceFieldsContrato(contrato) {

    const novoContrato = {
      cliente: {
        nome_razao_social: contrato.cliente.nome_razao_social,
        nome_fantasia: contrato.cliente.nome_fantasia,
        cnpj_cpf: removeMaskFromProp('cnpj_cpf')(contrato.cliente),
        inscricao_estadual: removeMaskFromProp('inscricao_estadualFormControl')(contrato.cliente)
      },
      contato : {
        email: contrato.contato.email,
        nome: contrato.contato.nome,
        observacao: contrato.contato.observacao,
        telefone: removeMaskFromProp('telefone')(contrato.contato),
        celular: removeMaskFromProp('celular')(contrato.contato)
      },
      endereco : {
        cep: removeMaskFromProp('cep')(contrato.endereco),
        rua: contrato.endereco.rua,
        bairro: contrato.endereco.bairro,
        numero: contrato.endereco.numero,
        cidade: contrato.endereco.cidade,
        complemento: contrato.endereco.complemento,
        uf: contrato.endereco.uf,
        ponto_referencia: contrato.endereco.ponto_referencia
      },
      dataAdesao: this.parseData(contrato.dataAdesao),
      valor: this.valorTotalContrato,
      diaVencimento: this.novoContratoForm.get('diaVencimento').value,
      resumoContrato: this.novoContratoForm.get('resumoContrato').value
    };

    return { ...contrato, ...novoContrato };
  }

  parseData(data) {
    return new Date(data.year, data.month - 1, data.day);
  }

  notificarFalhaEncontrarCliente() {
    this.notificacaoService.notificarAviso('Cliente não encontrado!', '');
  }

  notificarFalhaAssosiar() {
    this.notificacaoService.notificarAviso('CNPJ já está associado!', '');
  }

  notificarFalhaCadastro() {
    this.notificacaoService.notificarErro('Falha ao cadastrar o contrato!', '');
  }

  notificarSucesso() {
    this.notificacaoService.notificarSucesso('Contrato cadastrado com sucesso!', '');
  }

  podeDesativar() {
    if (this.novoContratoForm.touched) {
      if ( confirm('Deseja sair da página? Todos os dados serão perdidos!')) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

}
