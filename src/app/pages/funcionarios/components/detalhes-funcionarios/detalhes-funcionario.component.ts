import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { DadosEndereco } from './../../../../models';
import { Funcionario } from './../../../../models';
import { FuncionarioService } from './../../../../shared/services';
import { CepService } from './../../../../shared/services';
import { NotificacaoService } from './../../../../shared/services/notificacao-service';

@Component({
  selector: 'app-detalhes-funcionario',
  templateUrl: './detalhes-funcionario.component.html',
  styleUrls: ['./detalhes-funcionario.component.scss']
})
export class DetalhesFuncionarioComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  public formEdicaoFuncionario: FormGroup;
  private id: string;
  private funcionarioRecebido: Funcionario;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

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
     this._activatedRoute.params.subscribe(params => this.id = params['id']);
     this.recuperarFuncionario();
   }


   iniciarFormFuncionario() {
    this.formEdicaoFuncionario = this._fb.group({
      nome: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      data_nasc: ['', [Validators.required]],

      login: this._fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        tipo: ['', [Validators.required]]
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
      })
    });
 }

    buscaPorCep(cep: string) {
     this.sub = this._cepService.obterInfoEndereco(cep).subscribe((dados: DadosEndereco) => {
         this.formEdicaoFuncionario.get('rua').patchValue(dados.logradouro);
         this.formEdicaoFuncionario.get('bairro').patchValue(dados.bairro);
         this.formEdicaoFuncionario.get('cidade').patchValue(dados.localidade);
         this.formEdicaoFuncionario.get('uf').patchValue(dados.uf);
     });
   }

    recuperarFuncionario() {
      this.sub = this._funcionarioService.retornarUm(this.id).subscribe((dados) => {
        this.formEdicaoFuncionario.get('nome').patchValue(dados.nome);
        this.formEdicaoFuncionario.get('rg').patchValue(dados.rg);
        this.formEdicaoFuncionario.get('cpf').patchValue(dados.cpf);
        this.formEdicaoFuncionario.get('data_nasc').patchValue(dados.data_nasc);

        this.formEdicaoFuncionario.get('login.username').patchValue(dados.login.username);
        this.formEdicaoFuncionario.get('login.password').patchValue(dados.login.password);
        this.formEdicaoFuncionario.get('login.tipo').patchValue(dados.login.tipo);

        this.formEdicaoFuncionario.get('habilitacao.numero').patchValue(dados.habilitacao.numero);
        this.formEdicaoFuncionario.get('habilitacao.validade').patchValue(dados.habilitacao.validade);

        this.formEdicaoFuncionario.get('contato.nome').patchValue(dados.contato.nome);
        this.formEdicaoFuncionario.get('contato.email').patchValue(dados.contato.email);
        this.formEdicaoFuncionario.get('contato.telefone').patchValue(dados.contato.telefone);
        this.formEdicaoFuncionario.get('contato.celular').patchValue(dados.contato.celular);
        this.formEdicaoFuncionario.get('contato.observacao').patchValue(dados.contato.observacao);

        this.formEdicaoFuncionario.get('endereco.cep').patchValue(dados.endereco.cep);
        this.formEdicaoFuncionario.get('endereco.rua').patchValue(dados.endereco.rua);
        this.formEdicaoFuncionario.get('endereco.numero').patchValue(dados.endereco.numero);
        this.formEdicaoFuncionario.get('endereco.bairro').patchValue(dados.endereco.bairro);
        this.formEdicaoFuncionario.get('endereco.complemento').patchValue(dados.endereco.complemento);
        this.formEdicaoFuncionario.get('endereco.cidade').patchValue(dados.endereco.cidade);
        this.formEdicaoFuncionario.get('endereco.uf').patchValue(dados.endereco.uf);
        this.formEdicaoFuncionario.get('endereco.ponto_referencia').patchValue(dados.endereco.ponto_referencia);

        this.funcionarioRecebido = dados;
      });
    }

    atualizarTecnico(funcionario) {

      funcionario.cpf = funcionario.cpf.replace(/\D+/g, '');
      funcionario.rg = funcionario.rg.replace(/\D+/g, '');
      funcionario.contato.celular = funcionario.contato.celular.replace(/\D+/g, '');
      funcionario.contato.telefone = funcionario.contato.telefone.replace(/\D+/g, '');
      funcionario.endereco.cep = funcionario.endereco.cep.replace(/\D+/g, '');

      funcionario._id = this.id;

      this.sub = this._funcionarioService.atualizarFuncionario(funcionario)
      .subscribe(
        dados => {
      },
        erro => {
        this.falhaNaEdicao();
      },
        () => {
        this.sucessoNaEdicao();
      }
    );
  }

   sucessoNaEdicao() {
    this._notificacaoService.notificarSucesso(
      'Edição efetuada com sucesso!',
      ''
    );
    this.formEdicaoFuncionario.reset();
  }

  falhaNaEdicao() {
    this._notificacaoService.notificarErro(
      'Não foi possível efetuar a edição',
      ''
      );
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

}
