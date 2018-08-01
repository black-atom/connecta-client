import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { NotificationsService } from '../../../../shared/services';

import { TIPOATENDIMENTOMOCK } from './../../../../utils/mocks/tipo-atendimento.mock';
import { Atendimento, DadosEndereco, ContatoCliente, EnderecoCliente, Cliente } from './../../../../models';
import { AtendimentoService, ClienteService, CepService, NotificacaoService } from './../../../../shared/services';
import { IFormCanDeactivate } from './../../../../shared/guards/form-candeactivate.interface';
import { removeMaskFromProp } from 'app/shared/utils/StringUtils';

@Component({
  selector: 'app-detalhes-atendimento',
  templateUrl: './detalhes-atendimento.component.html',
  styleUrls: ['./detalhes-atendimento.component.scss']
})
export class DetalhesAtendimentoComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  public formEdicaoAtendimento: FormGroup;
  private subscription: Subscription;
  private id: string;
  public atendimentoRecebido: Atendimento;
  public contatoEscolhido: ContatoCliente;
  public enderecoEscolhido: EnderecoCliente;
  public detalhesAtendimentoEditarCampos = true;
  public clienteEncontrado: Cliente;
  public tecnico;
  public desativaData = false;
  public actionSelecionada;
  private today = new Date();

  constructor(private _atendimentoService: AtendimentoService,
              private _activatedRoute: ActivatedRoute,
              private _notificationsService: NotificationsService,
              private _cepService: CepService,
              private _fb: FormBuilder,
              private _router: Router,
              private _notificacaoService: NotificacaoService,
              private _clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.obterIdAtendimento();
  }

  obterIdAtendimento() {
    this._activatedRoute.params.subscribe(params => this.id = params['id']);
    this.recuperarAtendimento();
  }

  iniciarFormulario() {
    this.formEdicaoAtendimento = this._fb.group({

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
      motivos: this._fb.group({
        estado: [''],
        motivo: ['']
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
     this.subscription = this._clienteService.retornarUm(cnpj)
      .subscribe(res => {
          if (res) {
            this.formEdicaoAtendimento.get('cliente.nome_razao_social').patchValue(res.nome_razao_social);
            this.formEdicaoAtendimento.get('cliente.inscricao_estadual').patchValue(res.inscricao_estadual);
            this.formEdicaoAtendimento.get('cliente.nome_fantasia').patchValue(res.nome_fantasia);
          } else {
            this.notificarFalhaEncontrarCliente();
          }
      });
    }
  }

  recuperarAtendimento() {

      this.subscription = this._atendimentoService.retornarUm(this.id).subscribe((res) => {
      this.formEdicaoAtendimento.get('cliente.nome_razao_social').patchValue(res.cliente.nome_razao_social);
      this.formEdicaoAtendimento.get('cliente.cnpj_cpf').patchValue(res.cliente.cnpj_cpf);
      this.formEdicaoAtendimento.get('cliente.inscricao_estadual').patchValue(res.cliente.inscricao_estadual);
      this.formEdicaoAtendimento.get('cliente.nome_fantasia').patchValue(res.cliente.nome_fantasia);
      this.formEdicaoAtendimento.get('contato.email').patchValue(res.contato.email);
      this.formEdicaoAtendimento.get('contato.nome').patchValue(res.contato.nome);
      this.formEdicaoAtendimento.get('contato.telefone').patchValue(res.contato.telefone);
      this.formEdicaoAtendimento.get('contato.celular').patchValue(res.contato.celular);
      this.formEdicaoAtendimento.get('contato.observacao').patchValue(res.contato.observacao);
      this.formEdicaoAtendimento.get('endereco.cep').patchValue(res.endereco.cep);
      this.formEdicaoAtendimento.get('endereco.rua').patchValue(res.endereco.rua);
      this.formEdicaoAtendimento.get('endereco.bairro').patchValue(res.endereco.bairro);
      this.formEdicaoAtendimento.get('endereco.numero').patchValue(res.endereco.numero);
      this.formEdicaoAtendimento.get('endereco.cidade').patchValue(res.endereco.cidade);
      this.formEdicaoAtendimento.get('endereco.uf').patchValue(res.endereco.uf);
      this.formEdicaoAtendimento.get('endereco.complemento').patchValue(res.endereco.complemento);
      this.formEdicaoAtendimento.get('endereco.ponto_referencia').patchValue(res.endereco.ponto_referencia);
      this.formEdicaoAtendimento.get('tipo').patchValue(res.tipo);
      this.formEdicaoAtendimento.get('descricao').patchValue(res.descricao);
      this.formEdicaoAtendimento.get('testes_efetuados').patchValue(res.testes_efetuados);
      this.formEdicaoAtendimento.get('valor').patchValue(res.valor);
      this.formEdicaoAtendimento.get('modelo_equipamento').patchValue(res.modelo_equipamento);
      this.formEdicaoAtendimento.get('numero_equipamento').patchValue(res.numero_equipamento);
      this.formEdicaoAtendimento.get('estacionamento').patchValue(res.estacionamento);
      this.formEdicaoAtendimento.get('observacao').patchValue(res.observacao);
      this.formEdicaoAtendimento.get('data_atendimento').patchValue(this.parseDataPick(res.data_atendimento));
      this.formEdicaoAtendimento.get('autorizado').patchValue(res.autorizado);
      this.formEdicaoAtendimento.get('garantia').patchValue(res.garantia);


      this.atendimentoRecebido = res;
      this._clienteService.retornarUm(res.cliente.cnpj_cpf).subscribe((dados) => {
        this.clienteEncontrado = dados;
      });
    });
  }

  contatoSelecionado(contato) {
    this.formEdicaoAtendimento.get('contato.nome').patchValue(contato.nome);
    this.formEdicaoAtendimento.get('contato.telefone').patchValue(contato.telefone);
    this.formEdicaoAtendimento.get('contato.celular').patchValue(contato.celular);
    this.formEdicaoAtendimento.get('contato.email').patchValue(contato.email);
    this.formEdicaoAtendimento.get('contato.observacao').patchValue(contato.observacao);
  }

  enderecoSelecionado(endereco) {
    this.formEdicaoAtendimento.get('endereco.complemento').patchValue(endereco.complemento);
    this.formEdicaoAtendimento.get('endereco.uf').patchValue(endereco.uf);
    this.formEdicaoAtendimento.get('endereco.rua').patchValue(endereco.rua);
    this.formEdicaoAtendimento.get('endereco.bairro').patchValue(endereco.bairro);
    this.formEdicaoAtendimento.get('endereco.cep').patchValue(endereco.cep);
    this.formEdicaoAtendimento.get('endereco.cidade').patchValue(endereco.cidade);
    this.formEdicaoAtendimento.get('endereco.numero').patchValue(endereco.numero);
    this.formEdicaoAtendimento.get('endereco.ponto_referencia').patchValue(endereco.ponto_referencia);
  }

  tecnicoRecebido(tec) {
   this.tecnico = tec;
  }

  actionRecevida(acao) {
    this.actionSelecionada = acao;
  }

  parseDataPick(data) {
    const date = new Date(data);
    const formatoData = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() };
    return formatoData;
  }


  parseData(data) {
    return new Date(data.year, data.month - 1, data.day);
  }

  atendimentoFormatt(atendimento) {
    const editarAtendimento = {
      _id: this.id,
      cliente: {
        nome_razao_social: atendimento.cliente.nome_razao_social,
        nome_fantasia: atendimento.cliente.nome_fantasia,
        cnpj_cpf: removeMaskFromProp('cnpj_cpf')(atendimento.cliente),
        inscricao_estadual: removeMaskFromProp('inscricao_estadual')(atendimento.cliente)
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
      },
      data_atendimento: this.parseData(atendimento.data_atendimento).toString()
    };

    return editarAtendimento;
  }

  tipoAtendimentoExtraField(value) {
    switch (value) {
      case 'Autorizado': {
        this.formEdicaoAtendimento.get('valor').disable();
        this.formEdicaoAtendimento.get('autorizado').enable();
        this.formEdicaoAtendimento.get('garantia').disable();
        break;
      }
      case 'Garantia externa': {
        this.formEdicaoAtendimento.get('valor').disable();
        this.formEdicaoAtendimento.get('autorizado').disable();
        this.formEdicaoAtendimento.get('garantia').enable();
        break;
      }
      case 'Garantia laboratório': {
        this.formEdicaoAtendimento.get('valor').disable();
        this.formEdicaoAtendimento.get('autorizado').disable();
        this.formEdicaoAtendimento.get('garantia').enable();
        break;
      }
      case 'Garantia venda': {
        this.formEdicaoAtendimento.get('valor').disable();
        this.formEdicaoAtendimento.get('autorizado').disable();
        this.formEdicaoAtendimento.get('garantia').enable();
        break;
      }
      case 'NF - Avulso local': {
        this.formEdicaoAtendimento.get('valor').enable();
        this.formEdicaoAtendimento.get('autorizado').disable();
        this.formEdicaoAtendimento.get('garantia').disable();
        break;
      }
      case 'NF - Avulso online/telefone': {
        this.formEdicaoAtendimento.get('valor').enable();
        this.formEdicaoAtendimento.get('autorizado').disable();
        this.formEdicaoAtendimento.get('garantia').disable();
        break;
      }
      case 'NF - Registro de sistema': {
        this.formEdicaoAtendimento.get('valor').enable();
        this.formEdicaoAtendimento.get('autorizado').disable();
        this.formEdicaoAtendimento.get('garantia').disable();
        break;
      }
      default: {
        this.formEdicaoAtendimento.get('valor').disable();
        this.formEdicaoAtendimento.get('autorizado').disable();
        this.formEdicaoAtendimento.get('garantia').disable();
      }
    }
  }

  parserAtendimento(atendimento) {

    let motivos = this.atendimentoRecebido.motivos;
    let estado = 'agendado';
    let tecnico: any = { nome: null };

    if (atendimento.motivos.estado) {
      switch (atendimento.motivos.estado) {
        case 'cancelado': {
          estado = 'cancelado';
           motivos = [...motivos, ...atendimento.motivos];
         return { ...atendimento, ...this.atendimentoFormatt(atendimento), motivos, estado, tecnico };
        }
        case 'encaixe': {
          estado = 'associado';
          tecnico = { _id: this.tecnico._id, nome: this.tecnico.nome };
          motivos = [...motivos, ...atendimento.motivos];
         return { ...atendimento, ...this.atendimentoFormatt(atendimento), motivos, estado, tecnico };
        }
        case 'reagendado': {
          estado = 'agendado';
          motivos = [...motivos, ...atendimento.motivos];
         return { ...atendimento, ...this.atendimentoFormatt(atendimento), motivos, estado, tecnico };
        }
        default: {

         return { ...atendimento, ...this.atendimentoFormatt(atendimento), motivos, estado, tecnico };
        }
      }
    }
    return { ...atendimento, ...this.atendimentoFormatt(atendimento), motivos, estado, tecnico };

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

  // tslint:disable-next-line:variable-name
  salveNewNotification(nome_razao_social, data_atendimento, createdBy, _id) {
    const notification = {
      title: 'Atendimento alterado',
      message: `${nome_razao_social}`,
      user_created: createdBy,
      date: new Date(),
      id_data: _id,
      groups: ['5b28114b24d87b7014c29d4b']
    };
    return this._notificationsService.postNotification(notification).subscribe(res => console.log(res));
  }


  atualizarAtendimento(atendimento) {
    const atendimentoParse = this.parserAtendimento(atendimento);

    const concatAtendimento = { ...this.atendimentoRecebido, ...atendimentoParse };

    const atendimentoFormatado = this.tipoAtendimentoSelecionado(concatAtendimento);

    this.subscription = this._atendimentoService.atualizarAtendimento(atendimentoFormatado)
      .subscribe(
        ({ cliente: { nome_razao_social }, data_atendimento, updatedBy, _id }) => {
          this.salveNewNotification(nome_razao_social, data_atendimento, updatedBy, _id);
        },
          erro => this.falhaNaEdicao(),
            () => this.sucessoNaEdicao()
    );
  }

  podeDesativar() {
    if (this.formEdicaoAtendimento.touched) {
      if ( confirm('Deseja sair da página? Todos os dados serão perdidos!')) {
        return true;
      } else {
        return false;
        }
    }
      return true;
  }

  sucessoNaEdicao() {
    this._notificacaoService.notificarSucesso(
      'Edição efetuada com sucesso!',
      ''
    );
  }

  falhaNaEdicao() {
    this._notificacaoService.notificarErro(
      'Não foi possível efetuar a edição',
      ''
      );
  }

  falhaDataMenorQueAtual() {
      this._notificacaoService.notificarErro(
        'Data informada inferior a data atual',
        ''
      );
  }

  notificarFalhaEncontrarCliente() {
    this._notificacaoService.notificarAviso('Cliente não encontrado!', '');
  }

  ngOnDestroy() {
      if (this.subscription) {
      this.subscription.unsubscribe();
      }
  }

}
