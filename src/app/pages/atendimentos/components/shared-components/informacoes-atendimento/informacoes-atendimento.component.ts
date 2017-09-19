import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { FormGroup } from '@angular/forms';
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
  action = ['Reagendar', 'Cancelar'];
  campoData: boolean;
  campoMotivo: boolean;
  disabledData: boolean;

  @Input()
  formDescricaoAtendimento: FormGroup;

  disabledAutorizado: boolean;
  disabledValor: boolean;
  id;
  equipamento = [
    'ACESSO.NET',
    'ARGOS',
    'BASE ACU PROX CLANSHELL',
    'BASE ACU PROX CLANSHELL PERSONALIZADO',
    'BASE ACU PROX ISO',
    'BASE ACU PROX ISO PERSONALIZADO',
    'BOBINA 57X10',
    'BOBINA 57X110',
    'BOBINA 57X300',
    'BOBINA 57X360',
    'BOBINA 57X40',
    'CATRACA FIT BIO+PROX',
    'CATRACA LUMEN CARD II PROXIMIDADE',
    'CATRACA LUMEN CARD V BIOMÉTRICA',
    'CATRACA REVOLUTION BLACK 3 BIO + PROX',
    'CATRACA TOPDATA',
    'CIGARRA 100M',
    'HENRY PLUS',
    'HEXA B',
    'INNER REP PLUS',
    'KURUMIM REP II',
    'KURUMIM REP III MAX',
    'ORION 6',
    'PONTO SECULLUM 4',
    'PRISMA E',
    'PRISMA F',
    'PRISMA G',
    'PRISMA H',
    'PRISMA I',
    'PRISMA J',
    'PRISMA SF R01',
    'PRISMA SF R02',
    'PRISMA SF R03',
    'PRISMA SF R04',
    'RDI-1G',
    'RDI-1M',
    'RDI-1P',
    'RDI-2G',
    'RDI-2M',
    'RDI-2P',
    'SIRENE 250M',
    'SIRENE 500M',
    'TOK CERTO',
    'TOPDATA VIGGIA',
    'VEGA'
  ];

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
        this.campoMotivo = true;
      }else {
        this.campoData = false;
        this.campoMotivo = true;
      }
    }
}
