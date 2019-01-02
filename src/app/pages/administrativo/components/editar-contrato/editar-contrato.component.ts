import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { equals, sort, descend, prop } from 'ramda';

import { ClienteService, NotificacaoService, ContratoService } from 'app/shared/services';
import { removeMaskFromProp, parseDataBR } from 'app/shared/utils/StringUtils';

import { Cliente } from 'app/models';

@Component({
  selector: 'app-editar-contrato',
  templateUrl: './editar-contrato.component.html',
  styleUrls: ['./editar-contrato.component.scss']
})
export class EditarContratoComponent implements OnInit {

  public idContrato: string;
  public equipamento = null;
  public contratoRecebido;
  public qtdEquipamentos = 0;
  public subscription: Subscription;
  public editarContratoForm: FormGroup;

  public mascaraData = [/\d/, /\d/, '/', /\d/, /\d/, '/' , /\d/, /\d/, /\d/, /\d/];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private contratoService: ContratoService,
    private activatedRoute: ActivatedRoute,
    private notificacaoService: NotificacaoService
  ) { }

  ngOnInit() {
    this.initContratoForm();
    this.obterIdContrato();
    this.getContrato();
  }

  initContratoForm() {
    this.editarContratoForm = this.fb.group({
      _id: '',
      createdAt: '',
      updatedAt: '',
      createdBy: '',
      updatedBy: '',
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
      resumoContrato: [''],
      motivo: ['', Validators.required],
      dataEncerramento: [''],
      isInDebt: [false, Validators.required],
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
      fabricante: ['', Validators.required],
      numeroSerie: [''],
      visita: ['', Validators.required],
      valor: ['', Validators.required],
      imagemPath: [''],
      endereco: this.enderecoForm(),
      motivo: ['']
    });
  }

  propostaForm = (): FormGroup => {
    return this.fb.group({
      _id: [''],
      valor: [0, Validators.required],
      equipamentos: this.fb.array([]),
      ativo: true
    });
  }


  get propostas(): FormArray {
    return this.editarContratoForm.get('propostas') as FormArray;
  }

  get cnpjAssociados(): FormArray {
    return this.editarContratoForm.get('cnpjAssociados') as FormArray;
  }

  obterIdContrato = () => {
    this.subscription = this.activatedRoute.params.subscribe(params => this.idContrato = params['id']);
  }

  getContrato() {
   this.subscription = this.contratoService.getContrato(this.idContrato).subscribe(contrato => {
      this.editarContratoForm.patchValue(contrato);
      const propostaAtivas = contrato.propostas.filter(proposta => proposta.ativo);
      const propostaAtivasSorted = sort(descend(prop('criadoEm')), propostaAtivas);
      contrato.cnpjAssociados.map(cnpjAssociado => this.cnpjAssociados.push(this.fb.group({
        nome_razao_social: [cnpjAssociado.nome_razao_social, Validators.required],
        cnpj_cpf: [cnpjAssociado.cnpj_cpf, [Validators.required, Validators.minLength(11)]],
        inscricao_estadual: [cnpjAssociado.inscricao_estadual],
        nome_fantasia: [cnpjAssociado.nome_fantasia]
      })));
      this.propostas.patchValue([propostaAtivasSorted[0]]);
      const equipamentos = (<FormArray>this.propostas.at(0).get('equipamentos')) as FormArray;
      propostaAtivasSorted[0].equipamentos.map(equipamento => equipamentos.push(this.equipamentoForm()));
      equipamentos.patchValue(propostaAtivasSorted[0].equipamentos);
      this.qtdEquipamentos = propostaAtivasSorted[0].equipamentos.length;
      this.editarContratoForm.get('dataAdesao').patchValue(this.parseDataPick(contrato.dataAdesao));
      this.contratoRecebido = contrato;
    });
  }


  getCliente({ cnpj, tipo, index }) {

    if (this.validaVincular(cnpj)) {
      return this.notificarFalhaAssosiar();
    }

    return this.subscription = this.clienteService.retornarUm(cnpj)
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
    this.editarContratoForm.get('cliente').patchValue(cliente);
    this.editarContratoForm.get('contato').patchValue(cliente.contatos[0]);
    this.editarContratoForm.get('endereco').patchValue(cliente.enderecos[0]);
  }

  setClienteFormAssociado = (cliente, index) => {
    return this.cnpjAssociados.at(index).patchValue(cliente);
  }

  validaVincular = (cnpj) => {
    const noExistCnpjAssociation = this.cnpjAssociados.value.find(cliente => equals(cliente.cnpj_cpf, cnpj));
    const isExistCnpj = equals(cnpj, this.editarContratoForm.get('cliente').value.cnpj_cpf);
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


  actionsEquipamentoForm({ equipamento, type }) {
    return type === 'add' ? this.addEquipamento(equipamento) : this.editarEquipamento(equipamento);
  }

  addEquipamento = (equipamento) => {
    const equipamentoAlterado = equipamento;
    delete equipamentoAlterado.indexEquipamento;

    const equipamentos = (<FormArray>this.propostas.at(0).get('equipamentos')) as FormArray;
    equipamentos.push(this.fb.group(equipamentoAlterado));
    this.qtdEquipamentos = equipamentos.length;
    this.propostas.at(0).get('valor').patchValue(this.valueTotal());

  }

  actionsEquipamento({ indexEquipamento = null, type, equipamento }) {
    if (type === 'remove') {
      return this.removeEquipamento(indexEquipamento);
    }
    return this.getEquipamentoEdit({ indexEquipamento, ...equipamento });
  }

  editarEquipamento(equipamento) {
    const equipamentos = (<FormArray>this.propostas.at(0).get('equipamentos')) as FormArray;
    equipamentos.at(equipamento.indexEquipamento).patchValue(equipamento);
    this.propostas.at(0).get('valor').patchValue(this.valueTotal());
  }

  removeEquipamento(indexEquipamento) {
    const equipamentos = (<FormArray>this.propostas.at(0).get('equipamentos')) as FormArray;
    equipamentos.removeAt(indexEquipamento);
    this.qtdEquipamentos = equipamentos.length;
    this.propostas.at(0).get('valor').patchValue(this.valueTotal());
  }

  getEquipamentoEdit = equipamento => this.equipamento = equipamento;

  resetForm() {
    this.initContratoForm();
  }

  atualizarContrato(contrato) {
    const contratoParse = this.replaceFieldsContrato(contrato);
    const contratoAlterado = {
      ...this.contratoRecebido,
      ...contratoParse,
      propostas: contrato.propostas
    };

    this.contratoService
      .atualizarContrato(contratoAlterado)
      .subscribe(res => res ? this.notificarSucesso() : this.notificarFalhaEditar() );
  }

  valueTotal = () =>
   this.editarContratoForm.value.propostas[0].equipamentos.reduce((prev, { valor }) => prev + valor, 0)


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
      dataEncerramento: '',
      valor: this.valueTotal()
    };

    if (contrato.dataEncerramento) {
      return { ...contrato, ...novoContrato, ativo: false, dataEncerramento: parseDataBR(contrato.dataEncerramento) };
    }
    return { ...contrato, ...novoContrato };
  }

  parseDataPick(data) {
    const date = new Date(data);
    const formatoData = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() };
    return formatoData;
  }

  parseData(data) {
    if (data) {
      return new Date(data.year, data.month - 1, data.day);
    }
    return null;
  }

  removerCaracterEspecial(cnpj: string) {
    return cnpj.replace(/\D+/g, '');
  }

  mask(valorDaLinha: string) {
    if (valorDaLinha === undefined) {
      valorDaLinha = '';
    }

    const valor = valorDaLinha.replace(/\D+/g, '');
    if (valor.length > 11) {
      return [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    } else {
      return [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    }
  }


  notificarFalhaEncontrarCliente() {
    this.notificacaoService.notificarAviso('Cliente não encontrado!', '');
  }

  notificarFalhaAssosiar() {
    this.notificacaoService.notificarAviso('CNPJ já está associado!', '');
  }

  notificarFalhaEditar() {
    this.notificacaoService.notificarErro('Falha ao editar o contrato!', '');
  }

  notificarSucesso() {
    this.notificacaoService.notificarSucesso('Contrato editado com sucesso!', '');
  }

  podeDesativar() {
    if (this.editarContratoForm.touched) {
      if ( confirm('Deseja sair da página? Todos os dados serão perdidos!')) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
