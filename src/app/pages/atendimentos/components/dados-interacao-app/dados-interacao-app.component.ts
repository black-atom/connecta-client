import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Lightbox } from 'angular2-lightbox';

import { AtendimentoService } from './../../../../shared/services';
import { Atendimento } from './../../../../models';

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


  print(atendimento): void {
    window.print();
  }

  obterIdAtendimento() {
    this._activatedRoute.params.subscribe(params => this.id = params['id']);
    this.recuperarAtendimento();
  }

  recuperarAtendimento() {
    this.subscription = this._atendimentoService.retornarUm(this.id).subscribe((res) => {
      const assinatura = { nome: '', url: '', documento_id: '' };
      if (res.assinatura) {
        this.atendimento = res;
        this.carregarFotosAtendimento(res.imagens);
      }else {
        this.atendimento = { ...res, assinatura };
        this.carregarFotosAtendimento(res.imagens);
      }
    });

  }

  statusTecnico(status) {
    if (status === '') {
      return 'Aberto';
    }
    const estados = {
      em_descolamento: 'Técnico se deslocando ao cliente',
      chegou_ao_destino: 'Técnico chegou ao cliente',
      inicio_atendimento: 'Atendimento iniciado',
      fim_do_atendimento: 'Atendimento encerrado'
    };
    return estados[status];
  }

  carregarFotosAtendimento(imagens) {

    if (imagens.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < imagens.length; i++) {

        const img = imagens[i].url;
        const src = `https://storage.googleapis.com/blackatom-images/${img}`;
        const thumb = src;
        const fotosAtendimento = { src, thumb };

        if (imagens[i].tipo === 'inicio_atendimento') {
          this.fotosInicioAtendimento.push(fotosAtendimento);
        }else {
          this.fotosFinalAtendimento.push(fotosAtendimento);
        }

      }
    }
  }

  abrirFotosInicioAtendimento(index: number): void {
    this._lightbox.open(this.fotosInicioAtendimento, index);
  }

  abrirFotosFinalAtendimento(index: number): void {
    this._lightbox.open(this.fotosFinalAtendimento, index);
  }

}
