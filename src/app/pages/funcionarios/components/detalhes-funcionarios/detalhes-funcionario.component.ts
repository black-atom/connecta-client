import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { DadosEndereco, Funcionario } from './../../../../models';
import { CepService, FuncionarioService } from './../../../../shared/services';
import { NotificacaoService } from './../../../../shared/services/notificacao-service';
import { IFormCanDeactivate } from './../../../../shared/guards/form-candeactivate.interface';
import { removeMaskFromProp } from 'app/shared/utils/StringUtils';

@Component({
  selector: 'app-detalhes-funcionario',
  templateUrl: './detalhes-funcionario.component.html',
  styleUrls: ['./detalhes-funcionario.component.scss']
})
export class DetalhesFuncionarioComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  private subscription: Subscription;
  public formEdicaoFuncionario: FormGroup;
  private id: string;
  public funcionarioRecebido: Funcionario;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  public editarCamposTipo: boolean = true;

  constructor(private _funcionarioService: FuncionarioService,
              private _activatedRoute: ActivatedRoute,
              private _cepService: CepService,
              private _notificacaoService: NotificacaoService,
              private _fb: FormBuilder,
              private _router: Router) { }


  ngOnInit() {
    this.iniciarFormFuncionario();
    this.obterIdFuncionario();
  }

  obterIdFuncionario() {
    this.subscription = this._activatedRoute.params.subscribe(params => this.id = params['id']);
     this.recuperarFuncionario();
  }


  iniciarFormFuncionario() {
    this.formEdicaoFuncionario = this._fb.group({
      nome: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      data_nasc: ['', [Validators.required]],

      login: this._fb.group({
        username: ['', Validators.required],
        password: [''],
        tipo: this._fb.array([
          new FormControl(''),
          new FormControl('')
        ])
      }),
      habilitacao: this._fb.group({
        numero: [''],
        validade: ['']
      }),

      contato: this._fb.group({
        nome: ['', Validators.required],
        email: ['', [Validators.pattern(this.emailPattern)]],
        telefone: ['', [Validators.required]],
        celular: [''],
        observacao: ['']
      }),

      endereco: this._fb.group({
        cep: ['', [Validators.required]],
        rua: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        bairro: ['', [Validators.required]],
        complemento: [''],
        cidade: ['', [Validators.required]],
        uf: ['', [Validators.required]],
        ponto_referencia: ['']
      }),
      ativo: ['true', Validators.required]
    });
 }

  recuperarFuncionario() {
    this.subscription = this._funcionarioService.retornarUm(this.id).subscribe((dados) => {
      dados.login.password = '';
      this.formEdicaoFuncionario.patchValue(dados);
      this.funcionarioRecebido = dados;
    });
  }

  replaceFieldsFuncionario(funcionario) {

    const functionarioFormatado = {
      cpf : removeMaskFromProp('cpf')(funcionario),
      rg : removeMaskFromProp('rg')(funcionario)
    };

    const contato = {
      ...funcionario.contato,
      telefone : removeMaskFromProp('telefone')(funcionario.contato),
      celular : removeMaskFromProp('celular')(funcionario.contato)
    };

    const endereco = {
      ...funcionario.endereco,
      cep : removeMaskFromProp('cep')(funcionario.endereco)
    };

    const ativo = funcionario.ativo === 'true' || funcionario.ativo === true ? true : false;

    const login = {
      ...funcionario.login,
      tipo: funcionario.login.tipo.filter(t => t.length > 0)
    };

    return { ...funcionario, ...functionarioFormatado, contato, endereco, ativo, login };
  }

  atualizarTecnico(funcionario: Funcionario) {

    const funcionarioFormatado = this.replaceFieldsFuncionario(funcionario);
    funcionarioFormatado._id = this.id;

    if (funcionarioFormatado.login.hasOwnProperty('password') && funcionarioFormatado.login.password.length <= 0 ) {
          delete funcionarioFormatado.login.password;
    }

    this.subscription = this._funcionarioService.atualizarFuncionario(funcionarioFormatado)
      .subscribe(
          () => {},
            erro => this.falhaNaEdicao(),
            () => this.sucessoNaEdicao()
      );
  }

  podeDesativar() {
    if(this.formEdicaoFuncionario.touched) {
      if( confirm('Deseja sair da página? Todos os dados serão perdidos!')) {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
