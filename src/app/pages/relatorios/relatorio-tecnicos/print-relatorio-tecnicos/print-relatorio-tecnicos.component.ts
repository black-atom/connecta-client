import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-print-relatorio-tecnicos',
  templateUrl: './print-relatorio-tecnicos.html',
  styleUrls: ['./print-relatorio-tecnicos.scss']
})
export class PrintRelatorioTecnicosComponent implements OnInit {

  @Input()
  public tecnicoSelecionado;

  @Input()
  public dataAtividade;

  constructor() { }

  ngOnInit() { }

  parseStatus(status: string): string {
    switch (status) {
      case 'INICIO_DESLOCAMENTO' :
        return 'Início do deslocamento';
      case 'FIM_DESLOCAMENTO' :
        return 'Fim do deslocamento';
      case 'INICIO_ATIVIDADE' :
        return 'Início da atividade';
      case 'FIM_ATIVIDADE' :
        return 'Fim da atividade';
      case 'PAUSE_ATIVIDADE' :
        return 'Pausou a atividade';
      case 'CANCELA_ATIVIDADE' :
        return 'Cancelou a atividade';
    }
  }

  parseTipoAtividade(tipo: string): string {
    switch (tipo) {
      case 'almoco':
        return 'ALMOÇO';
      case 'abastecimento':
        return 'ABASTECIMENTO';
      case 'empresa':
        return 'RETORNO PARA REALPONTO';
    }
  }

}
