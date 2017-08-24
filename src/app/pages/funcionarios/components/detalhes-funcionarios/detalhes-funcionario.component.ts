import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
export class DetalhesFuncionarioComponent implements OnInit {

  public formEdicaoFuncionario: FormGroup;
  private _id: Number;
  private funcionarioRecebido: Funcionario;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private _funcionarioService: FuncionarioService,
              private _activatedRoute: ActivatedRoute,
              private _cepService: CepService,
              private _notificacaoService: NotificacaoService,
              private _fb: FormBuilder,
              private _router: Router) { }


  ngOnInit() {
    this.iniciarFormulario();
    this.obterIdFuncionario();
  }

  obterIdFuncionario() {
     this._activatedRoute.params.subscribe(params => this._id = +params['_id']);
     this.recuperarFuncionario();
   }

   iniciarFormulario() {
      this.formEdicaoFuncionario = this._fb.group({
          nome: ['', [Validators.required]],
          rg: ['', [Validators.required]],
          cpf: ['', [Validators.required]],
          data_nasc: ['', [Validators.required]],
          email: ['', [Validators.pattern(this.emailPattern)]],
          telefone: ['', [Validators.required]],
          celular: ['', [Validators.required]],
          observacao: [''],
          cnh: ['', [Validators.required]],
          validade_carteira: ['', [Validators.required]],
          rua: ['', [Validators.required]],
          numero: ['', [Validators.required]],
          complemento: [''],
          ponto_referencia: [''],
          bairro: ['', [Validators.required]],
          cidade: ['', [Validators.required]],
          uf: ['', [Validators.required]],
          cep: ['', [Validators.required]],
          createdAt: [''],
          updatedAt: [''],
          atendimentos: this._fb.array([])
     });
  }

    buscaPorCep(cep: string) {
     this._cepService.obterInfoEndereco(cep).subscribe((dados: DadosEndereco) => {
         this.formEdicaoFuncionario.get('rua').patchValue(dados.logradouro);
         this.formEdicaoFuncionario.get('bairro').patchValue(dados.bairro);
         this.formEdicaoFuncionario.get('cidade').patchValue(dados.localidade);
         this.formEdicaoFuncionario.get('uf').patchValue(dados.uf);

     });
   }

    recuperarFuncionario() {
      this._funcionarioService.retornarUm(this._id).subscribe((res) => {
        this.formEdicaoFuncionario.get('nome').patchValue(res.nome);
        this.formEdicaoFuncionario.get('rg').patchValue(res.rg);
        this.formEdicaoFuncionario.get('cpf').patchValue(res.cpf);
        this.formEdicaoFuncionario.get('data_nasc').patchValue(res.data_nasc);
        this.formEdicaoFuncionario.get('email').patchValue(res.contato.email);
        this.formEdicaoFuncionario.get('telefone').patchValue(res.contato.telefone);
        this.formEdicaoFuncionario.get('celular').patchValue(res.contato.celular);
        this.formEdicaoFuncionario.get('observacao').patchValue(res.contato.observacao);
        this.formEdicaoFuncionario.get('cnh').patchValue(res.habilitacao.numero);
        this.formEdicaoFuncionario.get('validade_carteira').patchValue(res.habilitacao.validade);
        this.formEdicaoFuncionario.get('rua').patchValue(res.endereco.rua);
        this.formEdicaoFuncionario.get('numero').patchValue(res.endereco.numero);
        this.formEdicaoFuncionario.get('complemento').patchValue(res.endereco.complemento);
        this.formEdicaoFuncionario.get('ponto_referencia').patchValue(res.endereco.ponto_referencia);
        this.formEdicaoFuncionario.get('bairro').patchValue(res.endereco.bairro);
        this.formEdicaoFuncionario.get('cidade').patchValue(res.endereco.cidade);
        this.formEdicaoFuncionario.get('uf').patchValue(res.endereco.uf);
        this.formEdicaoFuncionario.get('cep').patchValue(res.endereco.cep);

        this.funcionarioRecebido = res;
      });
    }

    atualizarTecnico(funcionario) {
      funcionario.updatedAt = new Date();
      funcionario.id = this._id;
      funcionario.createdAt = this.funcionarioRecebido._id;

      this._funcionarioService.atualizarFuncionario(funcionario)
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
    this.irParaGerenciar();
  }

  falhaNaEdicao() {
    this._notificacaoService.notificarErro(
      'Não foi possível efetuar a edição',
      ''
      );
    }

    irParaGerenciar() {
      setTimeout(() => {
        this._router.navigate(['/pages/funcionarios/gerenciar']);
      }, 1500);
    }

}
