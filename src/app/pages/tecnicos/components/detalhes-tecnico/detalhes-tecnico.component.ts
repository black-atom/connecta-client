import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AddressInfo } from './../../../../models/addressInfo';
import { TecnicoModel } from './../../../../models/tecnico/tecnico.interface';

import { TecnicoService } from './../../../../shared/services/tecnico-service/tecnico.service';
import { CepService } from './../../../../shared/services/cep-service/cep.service';


@Component({
  selector: 'app-detalhes-tecnico',
  templateUrl: './detalhes-tecnico.component.html',
  styleUrls: ['./detalhes-tecnico.component.scss']
})
export class DetalhesTecnicoComponent implements OnInit {

  formEditarTec: FormGroup;
  data = new Date();
  id: Number;
  tecnicoRecebido: TecnicoModel;
    // tslint:disable-next-line:max-line-length
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


  constructor(private _tecnicoService: TecnicoService,
              private _router: ActivatedRoute,
              private _cepService: CepService,
              private _fb: FormBuilder ) { }


  ngOnInit() {
    this.formInit();
    this.pegarId();

    if (this.id) {
      this.buscarTecnico();
    }
  }

   pegarId() {
     this._router.params.subscribe(params => this.id = +params['id']);
   }

   formInit() {
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
          bairro: ['', [Validators.required]],
          cidade: ['', [Validators.required]],
          estado: ['', [Validators.required]],
          cep: ['', [Validators.required]],
          createdAt: [''],
          updatedAt: [''],
          atendimentos: this._fb.array([]),
     });
  }
    buscaPorCep(cep: string) {
     this._cepService.obterInfoEndereco(cep).subscribe((data: AddressInfo) => {
         this.formEditarTec.get('rua').patchValue(data.logradouro);
         this.formEditarTec.get('bairro').patchValue(data.bairro);
         this.formEditarTec.get('cidade').patchValue(data.localidade);
         this.formEditarTec.get('estado').patchValue(data.uf);

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
        this.formEditarTec.get('bairro').patchValue(res.bairro);
        this.formEditarTec.get('cidade').patchValue(res.cidade);
        this.formEditarTec.get('estado').patchValue(res.estado);
        this.formEditarTec.get('cep').patchValue(res.cep);

        this.tecnicoRecebido = res;
      });
    }

    editar(tecnico) {
     tecnico.value.updatedAt = this.data;
     tecnico.value.id = this.tecnicoRecebido.id;
     tecnico.value.createdAt = this.tecnicoRecebido.createdAt;

    this._tecnicoService.editarTecnico(tecnico.value)
                        .subscribe(res => alert(res.nome));

    this.formEditarTec.reset();
   }

    limpar() {
     this.formEditarTec.reset();
   }


}
