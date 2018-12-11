import { ModalAlertComponent } from './../modal-alert/modal-alert.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs/Rx';

import { Atendimento, Cliente, ContatoCliente, EnderecoCliente, Contrato } from './../../../../models';
import { AtendimentoService, ClienteService, ContratoService } from './../../../../shared/services';
import { NotificacaoService } from './../../../../shared/services/notificacao-service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { IFormCanDeactivate } from './../../../../shared/guards/form-candeactivate.interface';

import { TIPOATENDIMENTOMOCK } from '../../../../utils/mocks';
import { removeMaskFromProp } from 'app/shared/utils/StringUtils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-novo-atendimento',
  templateUrl: './novo-atendimento.component.html',
  styleUrls: ['./novo-atendimento.component.scss']
})

export class NovoAtendimentoComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  private subscription: Subscription;
  public clienteEncontrado$: Observable<Cliente>;
  public contatoEscolhido: ContatoCliente;
  public enderecoEscolhido: EnderecoCliente;
  public atendimentosCount;
  public isClientInDebt: boolean = false;

  public formAtendimento: FormGroup;
  public novoAtendimentoEditarCampos: Boolean = true;

  constructor(private _fb: FormBuilder,
              private _atendimentoServiceService: AtendimentoService,
              private _notificacaoService: NotificacaoService,
              private _clienteService: ClienteService,
              private _ngbDateParserFormatter: NgbDateParserFormatter,
              private _contratoService: ContratoService,
              private _servicoModal: NgbModal) { }

  ngOnInit() {
    this.formulario();
  }

  formulario() {
    this.formAtendimento = this._fb.group({
      cliente: this._fb.group({
        nome_razao_social: ['', Validators.required],
        cnpj_cpf: ['', [Validators.required]],
        inscricao_estadual: [''],
        nome_fantasia: ['']

      }),
      contato: this._fb.group({
        email: ['', [Validators.required]],
        nome: [''],
        telefone: ['', [Validators.required]],
        celular: [''],
        observacao: ['']
      }),
      endereco: this._fb.group({
        cep: ['', [Validators.required]],
        rua: ['', [Validators.required]],
        bairro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        complemento: [''],
        uf: ['', [Validators.required]],
        ponto_referencia: ['']
      }),
      data_atendimento: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      valor: [{ value: '', disabled: true }, Validators.required],
      autorizado: [{ value: '', disabled: true }, Validators.required],
      garantia: [{ value: '', disabled: true }, Validators.required],
      modelo_equipamento: ['', [Validators.required]],
      numero_equipamento: [''],
      descricao: ['', [Validators.required]],
      testes_efetuados: ['', [Validators.required]],
      observacao: [''],
      estacionamento: ['', Validators.required]
    });
  }

  buscarCliente(cnpj) {
    if (cnpj) {
     this.clienteEncontrado$ = this._clienteService.retornarUm(cnpj)
      .map(cliente => {
         if (cliente) {
          this.formAtendimento.get('cliente.nome_razao_social').patchValue(cliente.nome_razao_social);
          this.formAtendimento.get('cliente.inscricao_estadual').patchValue(cliente.inscricao_estadual);
          this.formAtendimento.get('cliente.nome_fantasia').patchValue(cliente.nome_fantasia);
         }
          return cliente;
      })
      .filter(Boolean)
      .switchMap((cliente) => {
        return this._atendimentoServiceService.getLatestAtendimento(cliente.cnpj_cpf)
          .map((atendimentos) => {
            this.atendimentosCount = atendimentos.length;
            return cliente;
          });
      })
      .switchMap((cliente) => {
        return this._contratoService
          .contratosLazyLoad(0, 25, {
            'cliente.cnpj_cpf': cliente.cnpj_cpf
          })
          .map(response => response.contratos)
          .map((contratos: [Contrato]) => contratos.some(contrato => contrato.isInDebt))
          .do(isInDebt => this.isClientInDebt = isInDebt)
          .map(() => cliente)
      })
    }
  }


  contatoSelecionado(contato) {
    this.formAtendimento.get('contato.nome').patchValue(contato.nome);
    this.formAtendimento.get('contato.telefone').patchValue(contato.telefone);
    this.formAtendimento.get('contato.celular').patchValue(contato.celular);
    this.formAtendimento.get('contato.email').patchValue(contato.email);
    this.formAtendimento.get('contato.observacao').patchValue(contato.observacao);
  }

  enderecoSelecionado(endereco) {
    this.formAtendimento.get('endereco.complemento').patchValue(endereco.complemento);
    this.formAtendimento.get('endereco.uf').patchValue(endereco.uf);
    this.formAtendimento.get('endereco.rua').patchValue(endereco.rua);
    this.formAtendimento.get('endereco.bairro').patchValue(endereco.bairro);
    this.formAtendimento.get('endereco.cep').patchValue(endereco.cep);
    this.formAtendimento.get('endereco.cidade').patchValue(endereco.cidade);
    this.formAtendimento.get('endereco.numero').patchValue(endereco.numero);
    this.formAtendimento.get('endereco.ponto_referencia').patchValue(endereco.ponto_referencia);
  }

  replaceFieldsAtendimento(atendimento) {

    const novoAtendimento = {
      cliente: {
        nome_razao_social: atendimento.cliente.nome_razao_social,
        nome_fantasia: atendimento.cliente.nome_fantasia,
        cnpj_cpf: removeMaskFromProp('cnpj_cpf')(atendimento.cliente),
        inscricao_estadual: removeMaskFromProp('inscricao_estadualFormControl')(atendimento.cliente)
      },
      contato : {
        email: atendimento.contato.email,
        nome: atendimento.contato.nome,
        observacao: atendimento.contato.observacao,
        telefone: removeMaskFromProp('telefone')(atendimento.contato),
        celular: removeMaskFromProp('celular')(atendimento.contato)
      },
      endereco : {
        cep: removeMaskFromProp('cep')(atendimento.endereco),
        rua: atendimento.endereco.rua,
        bairro: atendimento.endereco.bairro,
        numero: atendimento.endereco.numero,
        cidade: atendimento.endereco.cidade,
        complemento: atendimento.endereco.complemento,
        uf: atendimento.endereco.uf,
        ponto_referencia: atendimento.endereco.ponto_referencia
      }
    };

    return { ...atendimento, ...novoAtendimento };
  }

  parseData(data) {
    return new Date(data.year, data.month - 1, data.day);
  }

  tipoAtendimentoSelecionado(atendimento) {
    const fieldUpdate = {
      'Autorizado': { valor: '', autorizado: atendimento.autorizado, garantia: '' },
      'Garantia externa': { valor: '', autorizado: '', garantia: atendimento.garantia },
      'Garantia laboratório': { valor: '', autorizado: '', garantia: atendimento.garantia },
      'Garantia venda': { valor: '', autorizado: '', garantia: atendimento.garantia },
      'NF - Avulso local': { valor: atendimento.valor, autorizado: '', garantia: '' },
      'NF - Avulso online/telefone': { valor: atendimento.valor, autorizado: '', garantia: '' },
      'NF - Registro de sistema': { valor: atendimento.valor, autorizado: '', garantia: '' },
      'Aberto por técnica': { valor: '', autorizado: '', garantia: '' },
      'Contrato garantia externo': { valor: '', autorizado: '', garantia: '' },
      'Contrato garantia laboratório': { valor: '', autorizado: '', garantia: '' },
      'Contrato garantia venda': { valor: '', autorizado: '', garantia: '' },
      'Contrato locação': { valor: '', autorizado: '', garantia: '' },
      'Contrato': { valor: '', autorizado: '', garantia: '' },
      'Contrato novo': { valor: '', autorizado: '', garantia: '' },
      'Venda': { valor: '', autorizado: '', garantia: '' },
      'Retorno': { valor: '', autorizado: '', garantia: '' },
      'Retorno Conserto': { valor: '', autorizado: '', garantia: '' },
      null: { valor: '', autorizado: '', garantia: '' }
    };
    return { ...atendimento, ...fieldUpdate[atendimento.tipo] };
  }

  tipoAtendimentoExtraField(value) {
    switch (value) {
      case 'Autorizado': {
        this.formAtendimento.get('valor').disable();
        this.formAtendimento.get('autorizado').enable();
        this.formAtendimento.get('garantia').disable();
        break;
      }
      case 'Garantia externa': {
        this.formAtendimento.get('valor').disable();
        this.formAtendimento.get('autorizado').disable();
        this.formAtendimento.get('garantia').enable();
        break;
      }
      case 'Garantia laboratório': {
        this.formAtendimento.get('valor').disable();
        this.formAtendimento.get('autorizado').disable();
        this.formAtendimento.get('garantia').enable();
        break;
      }
      case 'Garantia venda': {
        this.formAtendimento.get('valor').disable();
        this.formAtendimento.get('autorizado').disable();
        this.formAtendimento.get('garantia').enable();
        break;
      }
      case 'NF - Avulso local': {
        this.formAtendimento.get('valor').enable();
        this.formAtendimento.get('autorizado').disable();
        this.formAtendimento.get('garantia').disable();
        break;
      }
      case 'NF - Avulso online/telefone': {
        this.formAtendimento.get('valor').enable();
        this.formAtendimento.get('autorizado').disable();
        this.formAtendimento.get('garantia').disable();
        break;
      }
      case 'NF - Registro de sistema': {
        this.formAtendimento.get('valor').enable();
        this.formAtendimento.get('autorizado').disable();
        this.formAtendimento.get('garantia').disable();
        break;
      }
      default: {
        this.formAtendimento.get('valor').disable();
        this.formAtendimento.get('autorizado').disable();
        this.formAtendimento.get('garantia').disable();
      }
    }
  }

  cadastrarAtendimento(atendimento: Atendimento) {
    const atendimentoFormatado = this.replaceFieldsAtendimento(atendimento);
    atendimentoFormatado.data_atendimento = this.parseData(atendimentoFormatado.data_atendimento);
    atendimentoFormatado.estado = this.atendimentosCount > 3 ? 'bloqueado' : 'agendado';
    const updateTipoAtendimento = this.tipoAtendimentoSelecionado(atendimentoFormatado);

    this.subscription = this._atendimentoServiceService.novoAtendimento(updateTipoAtendimento).subscribe(
      ({ cliente: { nome_razao_social } }) => {

        // tslint:disable-next-line:no-unused-expression
        this.atendimentosCount > 3 ? this.abrirModalDeConfirmacao(nome_razao_social, this.atendimentosCount) : nome_razao_social;
      },
          erro => this.notificarFalhaCadastro(),
            () => {
              this.formAtendimento.reset();
              this.notificarSucesso();
            }
    );
  }

  podeDesativar() {
    if (this.formAtendimento.touched) {
      if ( confirm('Deseja sair da página? Todos os dados serão perdidos!')) {
        return true;
      } else {
        return false;
        }
    }
      return true;
  }

  abrirModalDeConfirmacao(cliente, totalAtendimentos) {
    const referenciaModal = this._servicoModal.open(ModalAlertComponent);
    referenciaModal.componentInstance.informacoes = { cliente, totalAtendimentos };
  }

  notificarSucesso() {
    this._notificacaoService.notificarSucesso('Cadastro efetuado com sucesso!', '');
    this.formAtendimento.reset();
  }

  notificarFalhaCadastro() {
    this._notificacaoService.notificarErro('Não foi possível efetuar o cadastro', '');
  }

  notificarFalhaEncontrarCliente() {
    this._notificacaoService.notificarAviso('Cliente não encontrado!', '');
  }

  notificarFalhaDataMenorQueAtual() {
    this._notificacaoService.notificarErro('Data informada inferior a data atual', '');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
