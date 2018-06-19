import { OnInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ClienteService, NotificacaoService, ContratoService } from 'app/shared/services';
import { removeMaskFromProp } from 'app/shared/utils/StringUtils';

import { Cliente } from 'app/models';

@Component({
  selector: 'app-novo-contrato',
  templateUrl: './novo-contrato.component.html',
  styleUrls: ['./novo-contrato.component.scss']
})
export class NovoContratoComponent implements OnInit {

  public cnpjBuscar;
  public equipamento;
  public qtdEquipamentos;
  public valorTotalContrato;
  public indexEquipamento;
  public novoContratoForm: FormGroup;
  public cliente$: Observable<Cliente>;

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
        celular: ['']
      }),
      endereco: this.enderecoForm(),
      propostas: this.fb.array([
        this.fb.group({
          valor: 0,
          equipamentos: this.fb.array([]),
          ativo: true
        })
      ]),
      numeroContrato: ['', [Validators.required, Validators.maxLength(60)]],
      dataAdesao: ['', Validators.required],
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
    endereco = {}
  } = {}): FormGroup {
    return this.fb.group({
      descricao: [descricao, Validators.required],
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

  get propostas(): FormArray {
    return this.novoContratoForm.get('propostas') as FormArray;
  }

  get cnpjAssociados(): FormArray {
    return this.novoContratoForm.get('cnpjAssociados') as FormArray;
  }

  getCliente(cnpj) {
    const cnpjParse = this.removerCaracterEspecial(cnpj);
    if (cnpjParse) {
      this.clienteService
      .retornarUm(cnpjParse)
      .subscribe(cliente => {
        if (cliente) {
          this.novoContratoForm.get('contato').patchValue(cliente.contatos[0]);
          this.novoContratoForm.get('endereco').patchValue(cliente.enderecos[0]);
          return this.novoContratoForm.get('cliente').patchValue(cliente);
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
    const cnpjPrincial = this.novoContratoForm.get('cliente.cnpj_cpf').value;
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

  removeEquipamento({ indexEquipamento, indexProposta: index }) {
    const equipamentos = (<FormArray>this.propostas.at(index).get('equipamentos')) as FormArray;
    equipamentos.removeAt(indexEquipamento);
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
    this.valorTotalContrato = equipamentos.reduce((total, equipamento) => {
      return total + equipamento.valor;
    }, 0);
  }

  cadastrarContrato() {
    const contratoFormatado = this.replaceFieldsAtendimento(this.novoContratoForm.value);
    this.contratoService.novoContrato(contratoFormatado)
    .subscribe(
      () => {},
      erro => this.notificarFalhaCadastro(),
        () => {
          this.resetForm();
          this.notificarSucesso();
        }
    );
  }

  replaceFieldsAtendimento(contrato) {

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
