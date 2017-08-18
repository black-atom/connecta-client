import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DadosEndereco } from './../../../../models';
import { Tecnico } from './../../../../models';
import { TecnicoService } from './../../../../shared/services';
import { CepService } from './../../../../shared/services';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-detalhes-tecnico',
  templateUrl: './detalhes-tecnico.component.html',
  styleUrls: ['./detalhes-tecnico.component.scss']
})
export class DetalhesTecnicoComponent implements OnInit {

  public formEdicaoTecnico: FormGroup;
  private id: Number;
  private tecnicoRecebido: Tecnico;
  public desabilitaElemento = true;
  public emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private _tecnicoService: TecnicoService,
              private _activatedRoute: ActivatedRoute,
              private _cepService: CepService,
              private _notificacaoService: NotificationsService,
              private _fb: FormBuilder,
              private _router: Router) { }


  ngOnInit() {
    this.iniciarFormulario();
    this.obterIdTecnico();
  }

  obterIdTecnico() {
     this._activatedRoute.params.subscribe(params => this.id = +params['id']);
     this.recuperarTecnico();
   }

   iniciarFormulario() {
      this.formEdicaoTecnico = this._fb.group({
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
         this.formEdicaoTecnico.get('rua').patchValue(dados.logradouro);
         this.formEdicaoTecnico.get('bairro').patchValue(dados.bairro);
         this.formEdicaoTecnico.get('cidade').patchValue(dados.localidade);
         this.formEdicaoTecnico.get('uf').patchValue(dados.uf);

     });
   }

    recuperarTecnico() {
      this._tecnicoService.retornarUm(this.id).subscribe((res) => {
        this.formEdicaoTecnico.get('nome').patchValue(res.nome);
        this.formEdicaoTecnico.get('rg').patchValue(res.rg);
        this.formEdicaoTecnico.get('cpf').patchValue(res.cpf);
        this.formEdicaoTecnico.get('data_nasc').patchValue(res.data_nasc);
        this.formEdicaoTecnico.get('email').patchValue(res.email);
        this.formEdicaoTecnico.get('telefone').patchValue(res.telefone);
        this.formEdicaoTecnico.get('celular').patchValue(res.celular);
        this.formEdicaoTecnico.get('observacao').patchValue(res.observacao);
        this.formEdicaoTecnico.get('cnh').patchValue(res.cnh);
        this.formEdicaoTecnico.get('validade_carteira').patchValue(res.validade_carteira);
        this.formEdicaoTecnico.get('rua').patchValue(res.rua);
        this.formEdicaoTecnico.get('numero').patchValue(res.numero);
        this.formEdicaoTecnico.get('complemento').patchValue(res.complemento);
        this.formEdicaoTecnico.get('ponto_referencia').patchValue(res.ponto_referencia);
        this.formEdicaoTecnico.get('bairro').patchValue(res.bairro);
        this.formEdicaoTecnico.get('cidade').patchValue(res.cidade);
        this.formEdicaoTecnico.get('uf').patchValue(res.uf);
        this.formEdicaoTecnico.get('cep').patchValue(res.cep);

        this.tecnicoRecebido = res;
      });
    }

    atualizarTecnico(tecnico) {
      tecnico.value.updatedAt = new Date();
      tecnico.value.id = this.tecnicoRecebido.id;
      tecnico.value.createdAt = this.tecnicoRecebido.id;

      this._tecnicoService.atualizarTecnico(tecnico.value)
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
    this._notificacaoService.success(
      'Edição efetuada com sucesso!',
      '',
      {
        timeOut: 1000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
      }
    );
    this.formEdicaoTecnico.reset();
    this.irParaGerenciar();
  }

  falhaNaEdicao() {
    this._notificacaoService.error(
      'Não foi possível efetuar a edição',
      '',
      {
        timeOut: 1000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
      }
      );
    }

    irParaGerenciar() {
      setTimeout(() => {
        this._router.navigate(['/pages/tecnicos/gerenciar']);
      }, 1500);
    }

}
