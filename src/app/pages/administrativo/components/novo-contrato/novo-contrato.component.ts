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
        nome_razao_social: [''],
        cnpj_cpf: ['', [Validators.required, Validators.minLength(11)]],
        inscricao_estadual: [''],
        nome_fantasia: ['']
      }),
      contato: this.fb.group({
        email: [''],
        nome: [''],
        telefone: [''],
        celular: [''],
        observacao: ['']
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
      cep: [cep, Validators.required],
      rua: [rua, Validators.required],
      bairro: [bairro, Validators.required],
      numero: [numero, Validators.required],
      cidade: [cidade, Validators.required],
      complemento: [complemento],
      uf: [uf, Validators.required],
      ponto_referencia: [ponto_referencia]
    });
  }

  getCliente(cnpj) {
    const cnpjParse = this.removerCaracterEspecial(cnpj);
    if (cnpjParse) {
      this.cliente$ = this.clienteService
      .retornarUm(cnpjParse)
      .map(cliente => {
        if (cliente) {

          console.log('teste');

          this.novoContratoForm.get('cliente').patchValue(cliente);
        } else {
          console.log('teste');
          this.notificarFalhaEncontrarCliente();
        }
        return cliente;
      });
    }
  }

  get propostas(): FormArray {
    return this.novoContratoForm.get('propostas') as FormArray;
  }

  addEquipamento({ equipamento, indexProposta: index }) {
    const equipamentos = (<FormArray>this.propostas.at(index).get('equipamentos')) as FormArray;
    equipamentos.push(this.equipamentoForm(equipamento));
    this.calculaValorTotalContrato(index, equipamentos.value);
    this.qtdEquipamentos = equipamentos.value.length;
  }

  editarEquipamento({ equipamento, indexEquipamento, indexProposta: index }) {
    const equipamentos = (<FormArray>this.propostas.at(index).get('equipamentos')) as FormArray;
    equipamentos.at(indexEquipamento).patchValue(equipamento);
    this.calculaValorTotalContrato(index, equipamentos.value);
    this.qtdEquipamentos = equipamentos.value.length;
  }

  removeEquipamento({ indexEquipamento, indexProposta: index }) {
    const equipamentos = (<FormArray>this.propostas.at(index).get('equipamentos')) as FormArray;
    equipamentos.removeAt(indexEquipamento);
    this.calculaValorTotalContrato(index, equipamentos.value);
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
      valor: this.valorTotalContrato
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

  notificarFalhaCadastro() {
    this.notificacaoService.notificarErro('Falha ao cadastrar o contrato!', '');
  }

  notificarSucesso() {
    this.notificacaoService.notificarSucesso('Contrato cadastrado com sucesso!', '');
  }

}
