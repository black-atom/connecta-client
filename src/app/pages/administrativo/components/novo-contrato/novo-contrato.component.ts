import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { ClienteService, NotificacaoService } from '../../../../shared/services';
import { equipamentosTemporarios } from './equipamento.mock.temp';
import { Cliente } from '../../../../models';
import { OnInit, Component } from '@angular/core';
import { removeMaskFromProp } from 'app/shared/utils/StringUtils';
import { ContratoService } from '../../../../shared/services/contrato-service/contrato.service';
@Component({
  selector: 'app-novo-contrato',
  templateUrl: './novo-contrato.component.html',
  styleUrls: ['./novo-contrato.component.scss']
})
export class NovoContratoComponent implements OnInit {

  public cnpjBuscar;
  public novoContratoForm: FormGroup;
  public cliente$: Observable<Cliente>;
  public patternRange = '\d[1-3]';

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
        nome_razao_social: ['', Validators.required],
        cnpj_cpf: ['', Validators.required],
        inscricao_estadual: [''],
        nome_fantasia: ['']
      }),
      contato: this.fb.group({
        email: ['', Validators.required],
        nome: [''],
        telefone: ['', Validators.required],
        celular: [''],
        observacao: ['']
      }),
      endereco: this.enderecoForm(),
      propostas: this.fb.array([
        this.fb.group({
          descricao: '',
          encerradoEm: '',
          valor: 0,
          equipamentos: this.fb.array([]),
          ativo: true
        })
      ]),
      numero_contrato: ['', [Validators.required, Validators.maxLength(60)]],
      data_adesao: ['', Validators.required],
      data_encerramento: ['', Validators.required],
      dia_vencimento: ['', Validators.required],
      subsequente: ['', Validators.required],
      tipo: ['', Validators.required],
      ativo: [true, Validators.required],
      resumo_contrato: ['']
    });
  }

  equipamentoForm({
    modelo = '',
    fabricante = '',
    numero_serie = '',
    visita = false,
    valor = 0,
    endereco = {}
  } = {}): FormGroup {
    return this.fb.group({
      modelo: [modelo, Validators.required],
      fabricante: [fabricante, Validators.required],
      numero_serie: [numero_serie, [Validators.required, Validators.minLength(4)]],
      visita: [visita, Validators.required],
      valor: [valor, Validators.required],
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
    const cnpjParse = cnpj
      ? this.removerCaracterEspecial(cnpj)
      : this.notificarFalhaEncontrarCliente();

    this.cliente$ = this.clienteService
      .retornarUm(cnpjParse).map(cliente => {
        if (cliente) {
          this.novoContratoForm.get('cliente').patchValue(cliente);
        }
        return cliente;
      });
  }

  get propostas(): FormArray {
    return this.novoContratoForm.get('propostas') as FormArray;
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

  addEquipamento({ equipamento, indexProposta: index }) {
    const equipamentos = (<FormArray>this.propostas.at(index).get('equipamentos')) as FormArray;
    equipamentos.push(this.equipamentoForm(equipamento));
  }

  removeEquipamento({ indexEquipamento, indexProposta: index }) {
    const equipamentos = (<FormArray>this.propostas.at(index).get('equipamentos')) as FormArray;
    equipamentos.removeAt(indexEquipamento);
  }

  patchEquipamento(equipamento) {
    const equipPath = this.equipamentoForm();
    equipPath.controls['modelo'].setValue(equipamento.modelo);
    equipPath.controls['fabricante'].setValue(equipamento.fabricante);
    return equipPath;
  }

  removerCaracterEspecial(cnpj: string) {
    return cnpj.replace(/\D+/g, '');
  }

  notificarFalhaEncontrarCliente() {
    this.notificacaoService.notificarAviso('Cliente não encontrado!', '');
  }

  notificarFalhaCadastro() {
    this.notificacaoService.notificarAviso('Falha ao cadastrar o contrato!', '');
  }

  notificarSucesso() {
    this.notificacaoService.notificarAviso('Contrato cadastrado com sucesso!', '');
  }


  cadastrarContrato() {
    // const contratoFormatado = this.replaceFieldsAtendimento(this.novoContratoForm.value);
    // console.log(contratoFormatado);
    this.contratoService.novoContrato(this.novoContratoForm.value).subscribe(
      () => {},
          erro => this.notificarFalhaCadastro(),
            () => {
              this.novoContratoForm.reset();
              this.initContratoForm();
              this.notificarSucesso();
            }
    );
  }

  parseData(data) {
    return new Date(data.year, data.month - 1, data.day);
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
      data_adesao: this.parseData(contrato.data_adesao),
      data_encerramento: this.parseData(contrato.data_encerramento)
    };

    return { ...contrato, ...novoContrato };
  }


}
