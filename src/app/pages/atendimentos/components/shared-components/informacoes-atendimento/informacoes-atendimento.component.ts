import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { EQUIPAMENTOS } from './../../../../../utils/mocks/equipamentos';
import { TIPOATENDIMENTOMOCK } from './../../../../../utils/mocks';
import { TIPOESTACIONAMENTO } from '../../../../../utils/mocks';

@Component({
  selector: 'app-informacoes-atendimento',
  templateUrl: './informacoes-atendimento.component.html',
  styleUrls: ['./informacoes-atendimento.component.scss']
})
export class InformacoesAtendimentoComponent implements OnInit {

  tipoAtendimento = TIPOATENDIMENTOMOCK;
  tipoEstacionamento = TIPOESTACIONAMENTO;
  action = ['Reagendar', 'Cancelar', 'Encaixe'];
  campoData: boolean;
  campoMotivo: boolean = true;
  desabilitaData: boolean;
  estilo = 'col-lg-4';

  @Input()
  formDescricaoAtendimento: FormGroup;

  desabilitaAutorizado: boolean;
  desabilitaValor: boolean;
  id;
  equipamentos = EQUIPAMENTOS;

  private mascaraDataAtendimento = [/\d/,/\d/,'/',/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/];

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.formDescricaoAtendimento.get('tipo').valueChanges
    .subscribe((values) => {
      this.tipoAtendimentoSelecionado(values);
    });
    this.obterIdAtendimento();
  }


  obterIdAtendimento() {
    this._activatedRoute.params.subscribe(params => this.id = params['id']);
    if (this.id === undefined) {
      this.desabilitaData = true;
      this.campoData = true;
    }else {
      this.desabilitaData = false;
    }
  }

  tipoAtendimentoSelecionado(tipoAtendimento) {

    if (tipoAtendimento === TIPOATENDIMENTOMOCK[11] ||
        tipoAtendimento === TIPOATENDIMENTOMOCK[12] ||
        tipoAtendimento === TIPOATENDIMENTOMOCK[13]) {
          this.estilo = 'col-lg-2';
          this.desabilitaValor = true;
          this.desabilitaAutorizado = false;
    }else if (tipoAtendimento === TIPOATENDIMENTOMOCK[1]) {
          this.estilo = 'col-lg-2';
          this.desabilitaValor = false;
          this.desabilitaAutorizado = true;
    }else {
          this.desabilitaValor = false;
          this.desabilitaAutorizado = false;
          this.estilo = 'col-lg-4';
    }
  }

  actionAtendimento(action) {
      if (action === this.action[0]) {
        this.campoData = true;
        this.campoMotivo = false;
      }else {
        this.campoData = false;
        this.campoMotivo = false;
      }
    }
}
