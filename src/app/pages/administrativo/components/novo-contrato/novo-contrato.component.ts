import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { ClienteService, NotificacaoService } from '../../../../shared/services';
import { equipamentosTemporarios } from './equipamento.mock.temp';
import { Cliente } from '../../../../models';
@Component({
  selector: 'app-novo-contrato',
  templateUrl: './novo-contrato.component.html',
  styleUrls: ['./novo-contrato.component.scss']
})
export default class NovoContratoComponent implements OnInit {

  public cnpjBuscar;
  public novoContratoForm: FormGroup;
  public cliente$: Observable<Cliente>;
  public patternRange = '\d[1-3]';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
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
          descricao: [''],
          encerradoEm: '',
          valor: [0, Validators.required],
          equipamentos: this.fb.array([]),
          ativo: [true, Validators.required]
        })
      ]),
      numero_contrato: ['', Validators.required],
      data_adesao: ['', Validators.required],
      data_encerramento: ['', Validators.required],
      dia_vencimento: ['', [Validators.required, Validators.pattern(this.patternRange)]],
      tipo: ['', Validators.required],
      ativo: [true, Validators.required],
      resumo_contrato: ['', Validators.required]
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
      numero_serie: [numero_serie, Validators.required],
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
        this.novoContratoForm.get('cliente.nome_razao_social').patchValue(cliente.nome_razao_social);
        this.novoContratoForm.get('cliente.inscricao_estadual').patchValue(cliente.inscricao_estadual);
        this.novoContratoForm.get('cliente.nome_fantasia').patchValue(cliente.nome_fantasia);
        this.novoContratoForm.get('cliente.cnpj_cpf').patchValue(cliente.cnpj_cpf);
        console.log(cliente);
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

}
