import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { ClienteService, NotificacaoService } from '../../../../shared/services';
import { Cliente } from '../../../../models';
import { equipamentosTemporarios } from './equipamento.mock.temp';

@Component({
  selector: 'app-novo-contrato',
  templateUrl: './novo-contrato.component.html',
  styleUrls: ['./novo-contrato.component.scss']
})
export default class NovoContratoComponent implements OnInit {

  public cnpjBuscar;
  public novoContratoForm: FormGroup;
  public cliente$: Observable<Cliente>;

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
      endereco: this.fb.group({
        cep: ['', Validators.required],
        rua: ['', Validators.required],
        bairro: ['', Validators.required],
        numero: ['', Validators.required],
        cidade: ['', Validators.required],
        complemento: [''],
        uf: ['', Validators.required],
        ponto_referencia: ['']
      }),
      propostas: this.fb.array([
        this.fb.group({
          descricao: [''],
          valor: [0, Validators.required],
          equipamentos: this.fb.array([this.equipamentoForm()]),
          encerradoEm: '',
          ativo: [true, Validators.required]
        })
      ]),
      numero_contrato: ['', Validators.required],
      data_adesao: ['', Validators.required],
      data_encerramento: ['', Validators.required],
      dia_vencimento: ['', Validators.required],
      tipo: ['', Validators.required],
      ativo: [true, Validators.required],
      resumo_contrato: ['', Validators.required]
    });
  }

  equipamentoForm() {
    return this.fb.group({
      modelo: ['', Validators.required],
      fabricante: ['', Validators.required],
      numeroSerie: ['', Validators.required],
      visita: ['', Validators.required],
      valor: ['', Validators.required],
      endereco: this.enderecoForm()
    });
  }

  enderecoForm() {
    return this.fb.group({
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      numero: ['', Validators.required],
      cidade: ['', Validators.required],
      complemento: [''],
      uf: ['', Validators.required],
      ponto_referencia: ['']
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

  removerCaracterEspecial(cnpj: string) {
    return cnpj.replace(/\D+/g, '');
  }

  notificarFalhaEncontrarCliente() {
    this.notificacaoService.notificarAviso('Cliente não encontrado!', '');
  }

}
