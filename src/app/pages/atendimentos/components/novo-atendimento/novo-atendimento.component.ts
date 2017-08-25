import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { Atendimento } from './../../../../models';
import { AtendimentoService, ClienteService } from './../../../../shared/services';
import { NotificacaoService } from './../../../../shared/services/notificacao-service';

@Component({
  selector: 'app-novo-atendimento',
  templateUrl: './novo-atendimento.component.html',
  styleUrls: ['./novo-atendimento.scss']
})
export class NovoAtendimentoComponent implements OnInit {

  public clienteEncontrado;
  public contatoEscolhido;
  public enderecoEscolhido;
  public formAtendimento: FormGroup;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private _fb: FormBuilder,
              private _atendimentoServiceService: AtendimentoService,
              private _notificacaoService: NotificacaoService,
              private _clienteService: ClienteService) { }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.formAtendimento = this._fb.group({
      razao_social: ['', Validators.required],
      cnpj_cpf: ['', [Validators.required]],
      inscricao_estadual: [''],
      nome_fantasia: [''],
      email: ['', [Validators.pattern(this.emailPattern)]],
      nome: ['', Validators.required],
      telefone: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      observacao: [''],
      cep: ['', [Validators.required]],
      rua: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      complemento: [''],
      uf: ['', [Validators.required]],
      ponto_referencia: [''],
      data: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      decricao: ['', [Validators.required]],
      estacionamento: ['', Validators.required],
      createAt: [''],
      updatedAt: ['']
    });
  }

  buscarCliente(cnpj) {
    if (cnpj) {
      this._clienteService.buscarCliente(cnpj)
      .subscribe((res) => {
        if (res) {
           const cliente = res[0];
         if (cliente !== undefined ) {
          this.formAtendimento.get('razao_social').patchValue(cliente.razao_social);
          this.formAtendimento.get('inscricao_estadual').patchValue(cliente.inscricao_estadual);
          this.formAtendimento.get('nome_fantasia').patchValue(cliente.nome_fantasia);
          this.clienteEncontrado = cliente;
         }else {
           this.falhaAoEncontrarCliente();
           this.formAtendimento.reset();
         }
        }
      }
    );
  }
}

  contatoSelecionado(contato) {
    this.formAtendimento.get('nome').patchValue(contato.nome);
    this.formAtendimento.get('telefone').patchValue(contato.telefone);
    this.formAtendimento.get('celular').patchValue(contato.celular);
    this.formAtendimento.get('email').patchValue(contato.email);
    this.formAtendimento.get('observacao').patchValue(contato.observacao);
  }

  enderecoSelecionado(endereco) {
    this.formAtendimento.get('complemento').patchValue(endereco.complemento);
    this.formAtendimento.get('uf').patchValue(endereco.uf);
    this.formAtendimento.get('rua').patchValue(endereco.rua);
    this.formAtendimento.get('bairro').patchValue(endereco.bairro);
    this.formAtendimento.get('cep').patchValue(endereco.cep);
    this.formAtendimento.get('cidade').patchValue(endereco.cidade);
    this.formAtendimento.get('numero').patchValue(endereco.numero);
    this.formAtendimento.get('ponto_referencia').patchValue(endereco.ponto_referencia);
  }


  cadastrarAtendimento(atendimento: Atendimento) {
    const dataFormAtendimento = new Date(atendimento.data_atendimento);   
    const dataAtual = new Date();

    if ( dataFormAtendimento.getDate() + 1 >= dataAtual.getDate() 
      && dataFormAtendimento.getMonth() >= dataAtual.getMonth()
      && dataFormAtendimento.getFullYear() >= dataAtual.getFullYear()) {   

        this._atendimentoServiceService.novoAtendimento(atendimento).subscribe(
          dados => {},
          erro => {
              this.falhaNoCadastro();
          },
          () => {
              this.sucessoNoCadastro();
          }
        );  
      } else {
        this.falhaDataMenorQueAtual();
      }
  }


  sucessoNoCadastro() {
    this._notificacaoService.notificarSucesso(
      'Cadastro efetuado com sucesso!',
      ''
    );
    this.formAtendimento.reset();
  }

  falhaNoCadastro() {
    this._notificacaoService.notificarErro(
      'Não foi possível efetuar o cadastro',
      ''
    );
  }

  falhaAoEncontrarCliente() {
    this._notificacaoService.notificarAviso(
      'Cliente não encontrado!',
      ''
    );
  }

  falhaDataMenorQueAtual() {
    this._notificacaoService.notificarErro(
      'Data informada inferior a data atual',
      ''
    );
  }
}
