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
  disabledData: boolean;

  @Input()
  formDescricaoAtendimento: FormGroup;

  disabledAutorizado: boolean;
  disabledValor: boolean;
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
      this.disabledData = true;
      this.campoData = true;
    }else {
      this.disabledData = false;
    }
  }

  tipoAtendimentoSelecionado(tipoAtendimento) {

    if (tipoAtendimento === TIPOATENDIMENTOMOCK[11] ||
        tipoAtendimento === TIPOATENDIMENTOMOCK[12] ||
        tipoAtendimento === TIPOATENDIMENTOMOCK[13]) {
          this.disabledValor = true;
          this.disabledAutorizado = false;
    }else if (tipoAtendimento === TIPOATENDIMENTOMOCK[1]) {
          this.disabledValor = false;
          this.disabledAutorizado = true;
    }else {
          this.disabledValor = false;
          this.disabledAutorizado = false;
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
