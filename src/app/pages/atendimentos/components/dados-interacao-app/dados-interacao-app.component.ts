import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Lightbox } from 'angular2-lightbox';

import { AtendimentoService } from './../../../../shared/services';
import { Atendimento } from './../../../../models';
import * as jsPDF from 'jspdf';
import ImprimirRelatorio from '../utils/relatorio-atendimento-pdf';

@Component({
  selector: 'app-dados-interacao-app',
  templateUrl: './dados-interacao-app.component.html',
  styleUrls: ['./dados-interacao-app.component.scss']
})
export class DadosInteracaoAppComponent implements OnInit {

  private id: string;
  private subscription: Subscription;
  public atendimento: Atendimento;
  public fotosInicioAtendimento = [];
  public fotosFinalAtendimento = [];


  constructor(private _activatedRoute: ActivatedRoute,
              private _atendimentoService: AtendimentoService,
              private _lightbox: Lightbox) {
              }

  ngOnInit() {
    this.obterIdAtendimento();
  }


  obterIdAtendimento() {
    this._activatedRoute.params.subscribe(params => this.id = params['id']);
    this.recuperarAtendimento();
  }

  recuperarAtendimento() {
    this.subscription = this._atendimentoService.retornarUm(this.id).subscribe((res) => {
      this.atendimento = res;
      this.carregarFotosAtendimento();
    });

  }

  carregarFotosAtendimento () {
    if (this.atendimento) {

      if (this.atendimento.imagens) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.atendimento.imagens.length; i++) {

          const img = this.atendimento.imagens[i].url;
          const src = `http://165.227.78.113:3000/atendimentoimagens/${img}`;
          const thumb = src;
          const fotosAtendimento = Object.assign({ src, thumb });

          if (this.atendimento.imagens[i].tipo === 'inicio_atendimento') {
            this.fotosInicioAtendimento.push(fotosAtendimento);
          }else {
            this.fotosFinalAtendimento.push(fotosAtendimento);
          }
        }
      }
    }else {
      this.carregarFotosAtendimento();
    }
  }

  abrirFotosInicioAtendimento(index: number): void {
    this._lightbox.open(this.fotosInicioAtendimento, index);
  }

  abrirFotosFinalAtendimento(index: number): void {
    this._lightbox.open(this.fotosFinalAtendimento, index);
  }

  relatorioAtendimentoPDF(dados) {
    const doc = new jsPDF();
    ImprimirRelatorio(doc, dados);
  }
}
