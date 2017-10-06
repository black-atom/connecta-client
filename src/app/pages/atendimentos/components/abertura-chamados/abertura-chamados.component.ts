import { Component, OnInit, ViewChild, HostListener, Input, ElementRef } from '@angular/core';
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


  private subscription: Subscription;

    public selecionados: any[] = [];
    public atendimentos: Observable<Atendimento[]>;
    public model: any;
    public dataSelecionada;
    public atendimentoSelecionado;

    constructor(private _atendimentoService: AtendimentoService,
                private _ngbDateParserFormatter: NgbDateParserFormatter) {}

  ngOnInit() {
    this._atendimentoService.getAllAtendimentosPorData(this.dataAgora());
    this.atendimentos = this._atendimentoService.atendimentos;
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
    this._atendimentoService.retornarUm(id).subscribe(res => {
      if (res.cliente.cnpj_cpf.length === 14) {
        // 00.000.000/0000-00
        const cnpj = res.cliente.cnpj_cpf;
        const formatado = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, '$1.$2.$3/$4-$5');
        res.cliente.cnpj_cpf = formatado;
      }else {
        // 000.000.000-00
        const cpf = res.cliente.cnpj_cpf;
        const formatado = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
        res.cliente.cnpj_cpf = formatado;
      }
      this.atendimentoSelecionado = res;
    });
  }

  @Input() position: number = 0;
  @Input() showSpeed: number = 500;
  @Input() moveSpeed: number = 1000;

  @ViewChild('baBackTop') _selector: ElementRef;

  @HostListener('click')
  _onClick(): boolean {
    jQuery('html, body').animate( { scrollTop: 75 }, { duration: this.moveSpeed });
    return false;
  }


}
