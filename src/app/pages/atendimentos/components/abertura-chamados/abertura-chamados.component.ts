import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs/Rx';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { AtendimentoService } from './../../../../shared/services/atendimento-service/atendimento.service';
import { Atendimento } from './../../../../models/atendimento.interface';

@Component({
  selector: 'app-abertura-chamados',
  templateUrl: './abertura-chamados.component.html',
  styleUrls: ['./abertura-chamados.component.scss']
})
export class AberturaChamadosComponent implements OnInit {


  private sub: Subscription;

    public selecionados: any[] = [];
    public atendimentos: Observable<Atendimento[]>;
    public model: any;
    public dataSelecionada;
    public atendimentoSelecionado;

    constructor(private _atendimentoService: AtendimentoService,
                private _ngbDateParserFormatter: NgbDateParserFormatter) {}

  ngOnInit() {
    this._atendimentoService.getAllAtendimentosPorData(this.dataAgora());
  }

  listaAtendimentoData(dataInformada: any) {
    dataInformada = this._ngbDateParserFormatter.format(this.model);
    const today = this.model;
    const searchDate = new Date(today.year, today.month - 1, today.day );
    this.dataSelecionada = searchDate;
    this._atendimentoService.getAllAtendimentosPorData(searchDate);
    this.atendimentos = this._atendimentoService.atendimentos;
  }


  dataAgora() {
    const today = new Date();
    const hoje = ({ day: today.getDate(), month: today.getMonth(), year: today.getFullYear() } );
    const searchDate = new Date(hoje.year, hoje.month, hoje.day );
    this.model = { year: searchDate.getFullYear(), day: searchDate.getDate(), month: searchDate.getMonth() + 1 };
    return searchDate;

  }

  selecionaAtendimento(id) {
    this._atendimentoService.retornarUm(id).subscribe(res => this.atendimentoSelecionado = res);
  }

}
