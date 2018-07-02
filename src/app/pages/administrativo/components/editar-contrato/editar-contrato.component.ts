import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { ClienteService, NotificacaoService, ContratoService } from 'app/shared/services';
import { removeMaskFromProp } from 'app/shared/utils/StringUtils';

import { Cliente } from 'app/models';

@Component({
  selector: 'app-editar-contrato',
  templateUrl: './editar-contrato.component.html',
  styleUrls: ['./editar-contrato.component.scss']
})
export class EditarContratoComponent implements OnInit {

  public idContrato: string;
  public cnpjBuscar: string;
  public equipamento;
  public valorTotalContrato;
  public contratoRecibido;
  public qtdEquipamentos: number;
  public indexEquipamento: number;
  public subscription: Subscription;
  public showMotivo: boolean = true;
  public editarContratoForm: FormGroup;
  public cliente$: Observable<Cliente>;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private contratoService: ContratoService,
    private activatedRoute: ActivatedRoute,
    private notificacaoService: NotificacaoService
  ) { }

  ngOnInit() {
    this.obterIdContrato();
    this.initContratoForm();
    this.getContrato();
  }

  initContratoForm() {
    this.editarContratoForm = this.fb.group({
      cliente: this.fb.group({
        nome_razao_social: '',
        cnpj_cpf: ['', [Validators.required, Validators.minLength(11)]],
        inscricao_estadual: '',
        nome_fantasia: ''
      }),
      cnpjAssociados: this.fb.array([]),

      contato: this.fb.group({
        email: ['', Validators.required],
        nome: [''],
        telefone: ['', Validators.required],
        celular: [''],
        observacao: ['']
      }),
      endereco: this.enderecoForm(),
      propostas: this.fb.array([
        this.propostaForm()
      ]),
      numeroContrato: ['', [Validators.required, Validators.maxLength(60)]],
      dataAdesao: ['', Validators.required],
      dataEncerramento: [''],
      diaVencimento: ['', Validators.required],
      subsequente: ['', Validators.required],
      tipo: ['', Validators.required],
      ativo: [true, Validators.required],
      resumoContrato: ['']
    });
  }

  equipamentoForm({
    descricao = '',
    categoria = '',
    modelo = '',
    fabricante = '',
    numeroSerie = '',
    visita = false,
    valor = 0,
    imagemPath = '',
    cnpjCliente = '',
    endereco = {}
  } = {}): FormGroup {
    return this.fb.group({
      descricao: [descricao, Validators.required],
      cnpjCliente: [cnpjCliente, Validators.required],
      categoria: [categoria, Validators.required],
      modelo: [modelo, Validators.required],
      fabricante: [fabricante, Validators.required],
      numeroSerie: [numeroSerie],
      visita: [visita, Validators.required],
      valor: [valor, Validators.required],
      imagemPath: [imagemPath],
      endereco: this.enderecoForm(endereco)
    });
  }

  enderecoForm({
    cep = '',
    rua = '',
    bairro = '',
    numero = '',
    cidade = '',
    complemento = '',
    uf = '',
    ponto_referencia = ''
  } = {}): FormGroup {
    return this.fb.group({
      cep: [cep],
      rua: [rua],
      bairro: [bairro],
      numero: [numero],
      cidade: [cidade],
      complemento: [complemento],
      uf: [uf],
      ponto_referencia: [ponto_referencia]
    });
  }

  clienteForm({
    nome_razao_social = '',
    cnpj_cpf = '',
    inscricao_estadual = '',
    nome_fantasia = ''
  } = {}): FormGroup {
    return this.fb.group({
      nome_razao_social: [nome_razao_social, Validators.required],
      cnpj_cpf: [cnpj_cpf, [Validators.required, Validators.minLength(11)]],
      inscricao_estadual: [inscricao_estadual],
      nome_fantasia: [nome_fantasia]
    });
  }

  propostaForm({
    _id = '',
    valor = 0,
    equipamentos = this.fb.array([]),
    ativo = true,
    descricao = ''
  } = {}): FormGroup {
    return this.fb.group({
      _id: [_id],
      valor: [valor],
      equipamentos,
      ativo: [ativo],
      descricao: [descricao, [Validators.required, Validators.minLength(4)]]
    });
  }

  obterIdContrato() {
    this.subscription = this.activatedRoute.params
    .subscribe(params => this.idContrato = params['id']);
  }

  getContrato() {
    this.subscription = this.contratoService.getContrato(this.idContrato).subscribe(contrato => {
      this.editarContratoForm.get('cliente').patchValue(contrato.cliente);
      this.editarContratoForm.get('contato').patchValue(contrato.contato);
      this.editarContratoForm.get('endereco').patchValue(contrato.endereco);
      this.editarContratoForm.get('numeroContrato').patchValue(contrato.numeroContrato);
      this.editarContratoForm.get('diaVencimento').patchValue(contrato.diaVencimento);
      this.editarContratoForm.get('subsequente').patchValue(contrato.subsequente);
      this.editarContratoForm.get('tipo').patchValue(contrato.tipo);
      this.editarContratoForm.get('resumoContrato').patchValue(contrato.resumoContrato);
      this.editarContratoForm.get('dataAdesao').patchValue( this.parseDateForPathValue(contrato.dataAdesao));
      const propostaAtiva = contrato.propostas.filter(proposta => proposta.ativo);
      propostaAtiva[0].descricao = '';
      this.editarContratoForm.get('propostas').patchValue(propostaAtiva);
      const equipamentos = contrato.propostas.find(proposta => proposta.ativo).equipamentos;
      this.qtdEquipamentos = equipamentos.length;
      const equipamentosForm = this.editarContratoForm.get('propostas') as FormArray;
      const equiArray = equipamentosForm.at(0).get('equipamentos') as FormArray;
      equipamentos.map(equipamento => equiArray.push(this.fb.group(equipamento)));
      this.calculaTotalInicioEditar(equipamentos);
      const cnpjAssociadosForm = this.editarContratoForm.get('cnpjAssociados') as FormArray;
      contrato.cnpjAssociados.map(cnpj => cnpjAssociadosForm.push(this.clienteForm(cnpj)));
      this.contratoRecibido = contrato;
    });
  }

  parseDateForPathValue(date) {
    const data = new Date(date);
    const parseDate = { year: data.getFullYear(), month: data.getMonth() + 1, day: data.getDate() };
    return parseDate;
  }

  get propostas(): FormArray {
    return this.editarContratoForm.get('propostas') as FormArray;
  }

  get cnpjAssociados(): FormArray {
    return this.editarContratoForm.get('cnpjAssociados') as FormArray;
  }

  getCliente(cnpj) {
    const cnpjParse = this.removerCaracterEspecial(cnpj);
    if (cnpjParse) {
      this.clienteService
      .retornarUm(cnpjParse)
      .subscribe(cliente => {
        if (cliente) {
          this.editarContratoForm.get('contato').patchValue(cliente.contatos[0]);
          this.editarContratoForm.get('endereco').patchValue(cliente.enderecos[0]);
          return this.editarContratoForm.get('cliente').patchValue(cliente);
        }
        return this.notificarFalhaEncontrarCliente();
      });
    }
  }

  getClienteEhVincular(cnpj) {
    const cnpjParse = this.removerCaracterEspecial(cnpj.cnpj);
    if (this.validaVincular(cnpjParse)) {
      return this.notificarFalhaAssosiar();
    }
    if (cnpjParse) {
      this.clienteService
      .retornarUm(cnpjParse)
      .subscribe(cliente => {
        if (cliente) {
          return this.cnpjAssociados.at(cnpj.index).patchValue(cliente);
        }
        return this.notificarFalhaEncontrarCliente();
      });
    }
  }

  validaVincular(cnpj) {
    const cnpjPrincial = this.editarContratoForm.get('cliente.cnpj_cpf').value;
    const cnpjVinculados = this.cnpjAssociados.value;
    cnpjVinculados.pop();
    if (cnpj === cnpjPrincial || cnpjVinculados.some(res => res.cnpj_cpf === cnpj)) {
      return true;
    }
  }

  adicionarCampoVincularCnpj() {
    const cnpjAssociados = <FormArray> this.cnpjAssociados;
    cnpjAssociados.push(this.clienteForm());
  }

  removerCnpj(index) {
    const cnpjAssociados = <FormArray> this.cnpjAssociados;
    cnpjAssociados.removeAt(index);
  }

  addEquipamento({ equipamento, indexProposta: index }) {
    const equipamentos = (<FormArray>this.propostas.at(index).get('equipamentos')) as FormArray;
    equipamentos.push(this.equipamentoForm(equipamento));
    this.calculaValorTotalContrato(index, equipamentos.value);
    (<FormArray>this.propostas.at(index).get('valor')).setValue(this.valorTotalContrato);
    this.qtdEquipamentos = equipamentos.value.length;
  }

  editarEquipamento({ equipamento, indexEquipamento, indexProposta: index }) {
    const equipamentos = (<FormArray>this.propostas.at(index).get('equipamentos')) as FormArray;
    equipamentos.at(indexEquipamento).patchValue(equipamento);
    this.calculaValorTotalContrato(index, equipamentos.value);
    (<FormArray>this.propostas.at(index).get('valor')).setValue(this.valorTotalContrato);
    this.qtdEquipamentos = equipamentos.value.length;
  }

  removeEquipamento({ equipamento, indexProposta: index, index: indexEquipamento }) {
    console.log('equipamento', equipamento);
    console.log('index', index);
    console.log('indexEquipamento', indexEquipamento);
    const equipamentos = (<FormArray>this.propostas.at(index).get('equipamentos')) as FormArray;
    equipamentos.at(indexEquipamento).patchValue(equipamento);
    this.calculaValorTotalContrato(index, equipamentos.value);
    (<FormArray>this.propostas.at(index).get('valor')).setValue(this.valorTotalContrato);
    this.qtdEquipamentos = equipamentos.value.length;
  }

  getEquipamentoEdit({ equipamento, index }) {
    this.equipamento = equipamento;
    this.indexEquipamento = index;
  }

  resetForm() {
    this.cnpjBuscar = '';
    this.qtdEquipamentos = 0;
    this.valorTotalContrato = 0;
    this.initContratoForm();
  }

  calculaValorTotalContrato(index, equipamentos) {
    const hasEncerradoEm = equip => equip.encerradoEm ? 0 : equip.valor;
    this.valorTotalContrato = equipamentos.reduce((total, equipamento) => {
      return total + hasEncerradoEm(equipamento);
    }, 0);
  }

  calculaTotalInicioEditar(equipamentos) {
    this.valorTotalContrato = equipamentos.reduce((total, equipamento) => {
      return total + equipamento.valor;
    }, 0);
  }

  atualizarContrato(contrato) {
    const propostas = this.contratoRecibido.propostas.map(proposta => proposta._id === contrato.propostas[0]._id ? contrato.propostas[0] : proposta);
    const contratoAlterado = { ...this.contratoRecibido, ...contrato, propostas };
    const parseContrato = this.replaceFieldsContrato(contratoAlterado);
    console.log(parseContrato);
    this.contratoService.atualizarContrato(parseContrato).subscribe(res => res ? this.notificarSucesso() : this.notificarFalhaEditar() );
  }

  encerrarContrato(contrato) {
    const propostas = this.contratoRecibido.propostas.map(proposta => proposta._id === contrato.propostas[0]._id ? contrato.propostas[0] : proposta);
    const contratoAlterado = { ...this.contratoRecibido, ...contrato, propostas };
    const parseContrato = this.replaceFieldsContrato(contratoAlterado);
    parseContrato.ativo = false;
    console.log(parseContrato);
    this.contratoService.atualizarContrato(parseContrato).subscribe(res => res ? this.notificarSucesso() : this.notificarFalhaEditar() );
  }

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
      dataEncerramento: this.parseData(contrato.dataEncerramento),
      valor: this.valorTotalContrato
    };

    return { ...contrato, ...novoContrato };
  }

  parseData(data) {
    if (data) {
      return new Date(data.year, data.month - 1, data.day);
    }
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

  collapseMotivo(): void {
    this.showMotivo === true ? this.showMotivo = false : this.showMotivo = true;
  }

}
