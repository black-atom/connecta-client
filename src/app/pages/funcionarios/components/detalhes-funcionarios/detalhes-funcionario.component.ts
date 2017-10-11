import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { DadosEndereco } from './../../../../models';
import { Funcionario } from './../../../../models';
import { FuncionarioService } from './../../../../shared/services';
import { CepService } from './../../../../shared/services';
import { NotificacaoService } from './../../../../shared/services/notificacao-service';
import { IFormCanDeactivate } from './../../../../shared/guards/form-candeactivate.interface';

@Component({
  selector: 'app-detalhes-funcionario',
  templateUrl: './detalhes-funcionario.component.html',
  styleUrls: ['./detalhes-funcionario.component.scss']
})
export class DetalhesFuncionarioComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  private subscription: Subscription;
  public formEdicaoFuncionario: FormGroup;
  private id: string;
  private funcionarioRecebido: Funcionario;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  public tipo: string[] = [];
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
        tipo: ['']
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
     this.subscription = this._cepService.obterInfoEndereco(cep).subscribe((dados: DadosEndereco) => {
         this.formEdicaoFuncionario.get('rua').patchValue(dados.logradouro);
         this.formEdicaoFuncionario.get('bairro').patchValue(dados.bairro);
         this.formEdicaoFuncionario.get('cidade').patchValue(dados.localidade);
         this.formEdicaoFuncionario.get('uf').patchValue(dados.uf);
     });
   }

    recuperarFuncionario() {
      this.subscription = this._funcionarioService.retornarUm(this.id).subscribe((dados) => {
        this.formEdicaoFuncionario.patchValue(dados);
        this.funcionarioRecebido = dados;
      });
    }


   permissao(perm) {
    this.tipo = perm;
    }

    atualizarTecnico(funcionario: Funcionario) {


        funcionario.cpf = funcionario.cpf.replace(/\D+/g, '');
        funcionario.rg = funcionario.rg.replace(/\D+/g, '');
        funcionario.contato.celular = funcionario.contato.celular.replace(/\D+/g, '');
        funcionario.contato.telefone = funcionario.contato.telefone.replace(/\D+/g, '');
        funcionario.endereco.cep = funcionario.endereco.cep.replace(/\D+/g, '');
        funcionario.login.tipo = this.tipo;
        funcionario._id = this.id;
             this.subscription = this._funcionarioService.atualizarFuncionario(funcionario)
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


 podeDesativar() {
  if(this.formEdicaoFuncionario.touched) {
    confirm('Deseja sair da página? Todos os dados serão perdidos!')
   }
   return true;
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
      this.subscription.unsubscribe();
    }

}
