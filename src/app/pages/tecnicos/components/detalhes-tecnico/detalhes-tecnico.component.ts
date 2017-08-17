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

  formEditarTec: FormGroup;
  id: Number;
  tecnicoRecebido: Tecnico;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  desabilitaSelect = true;

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
     this.buscarTecnico();
   }

   iniciarFormulario() {
      this.formEditarTec = this._fb.group({
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
         this.formEditarTec.get('rua').patchValue(dados.logradouro);
         this.formEditarTec.get('bairro').patchValue(dados.bairro);
         this.formEditarTec.get('cidade').patchValue(dados.localidade);
         this.formEditarTec.get('uf').patchValue(dados.uf);

     });
   }

    buscarTecnico() {
      this._tecnicoService.retornarUm(this.id).subscribe((res) => {
        this.formEditarTec.get('nome').patchValue(res.nome);
        this.formEditarTec.get('rg').patchValue(res.rg);
        this.formEditarTec.get('cpf').patchValue(res.cpf);
        this.formEditarTec.get('data_nasc').patchValue(res.data_nasc);
        this.formEditarTec.get('email').patchValue(res.email);
        this.formEditarTec.get('telefone').patchValue(res.telefone);
        this.formEditarTec.get('celular').patchValue(res.celular);
        this.formEditarTec.get('observacao').patchValue(res.observacao);
        this.formEditarTec.get('cnh').patchValue(res.cnh);
        this.formEditarTec.get('validade_carteira').patchValue(res.validade_carteira);
        this.formEditarTec.get('rua').patchValue(res.rua);
        this.formEditarTec.get('numero').patchValue(res.numero);
        this.formEditarTec.get('complemento').patchValue(res.complemento);
        this.formEditarTec.get('ponto_referencia').patchValue(res.ponto_referencia);
        this.formEditarTec.get('bairro').patchValue(res.bairro);
        this.formEditarTec.get('cidade').patchValue(res.cidade);
        this.formEditarTec.get('uf').patchValue(res.uf);
        this.formEditarTec.get('cep').patchValue(res.cep);

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
        this.falhaNaAtualizacao();
      },
        () => {
        this.sucessoNaAtualizacao();
      }
    );
  }
  
   sucessoNaAtualizacao() {
    this._notificacaoService.success(
      'Cadastro efetuado com sucesso!',
      '',
      {
        timeOut: 1000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
      }
    );
    this.formEditarTec.reset();
    this.irParaGerenciar();
  }
  
  falhaNaAtualizacao() {
    this._notificacaoService.error(
      'Não foi possível efetuar o cadastro',
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
