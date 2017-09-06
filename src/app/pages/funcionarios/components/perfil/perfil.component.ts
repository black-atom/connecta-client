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
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  private sub: Subscription;
  public formEdicaoFuncionario: FormGroup;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private _funcionarioService: FuncionarioService,
              private _activatedRoute: ActivatedRoute,
              private _cepService: CepService,
              private _notificacaoService: NotificacaoService,
              private _fb: FormBuilder,
              private _router: Router) { }


  ngOnInit() {
    this.iniciarFormFuncionario();
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

    atualizarTecnico(funcionario) {

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

}
