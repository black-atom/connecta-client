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

  @Input()
  campoData: boolean;

  @Input()
  campoMotivo: boolean = true;

  @Input()
  desabilitaData: boolean;
  estilo = 'col-lg-4';

  @Input()
  formDescricaoAtendimento: FormGroup;

  desabilitaAutorizado: boolean;
  desabilitaValor: boolean;
  desabilitaGarantia: boolean;
  equipamentos = EQUIPAMENTOS;

  private mascaraDataAtendimento = [/\d/,/\d/,'/',/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/];

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.formDescricaoAtendimento.get('tipo').valueChanges
    .subscribe((values) => {
      this.tipoAtendimentoSelecionado(values);
    });

  }

  tipoAtendimentoSelecionado(tipoAtendimento) {
    const desativaCampo = {
      'Autorizado': { valor: false, autorizado: true, garantia: false, estilo: 'col-lg-2' },
      'Garantia externa': { valor: false, autorizado: false, garantia: true, estilo: 'col-lg-2' },
      'Garantia laboratório': { valor: false, autorizado: false, garantia: true, estilo: 'col-lg-2' },
      'Garantia venda': { valor: false, autorizado: false, garantia: true, estilo: 'col-lg-2' },
      'NF - Avulso local': { valor: true, autorizado: false, garantia: false, estilo: 'col-lg-2' },
      'NF - Avulso online/telefone': { valor: true, autorizado: false, garantia: false, estilo: 'col-lg-2' },
      'NF - Registro de sistema': { valor: true, autorizado: false, garantia: false, estilo: 'col-lg-2' },
      'Aberto por técnica': { valor: false, autorizado: false, garantia: false, estilo: 'col-lg-4' },
      'Contrato garantia externo': { valor: false, autorizado: false, garantia: false, estilo: 'col-lg-4' },
      'Contrato garantia laboratório': { valor: false, autorizado: false, garantia: false, estilo: 'col-lg-4' },
      'Contrato garantia venda': { valor: false, autorizado: false, garantia: false, estilo: 'col-lg-4' },
      'Contrato locação': { valor: false, autorizado: false, garantia: false, estilo: 'col-lg-4' },
      'Contrato': { valor: false, autorizado: false, garantia: false, estilo: 'col-lg-4' },
      'Contrato novo': { valor: false, autorizado: false, garantia: false, estilo: 'col-lg-4' },
      'Venda': { valor: false, autorizado: false, garantia: false, estilo: 'col-lg-4' },
      'Retorno': { valor: false, autorizado: false, garantia: false, estilo: 'col-lg-4' },
      'Retorno Conserto': { valor: false, autorizado: false, garantia: false, estilo: 'col-lg-4' },
      null: { valor: false, autorizado: false, garantia: false, estilo: 'col-lg-4' }
    };
    this.estilo = desativaCampo[tipoAtendimento].estilo;
    this.desabilitaValor = desativaCampo[tipoAtendimento].valor;
    this.desabilitaAutorizado = desativaCampo[tipoAtendimento].autorizado;
    this.desabilitaGarantia = desativaCampo[tipoAtendimento].garantia;
  }

}
