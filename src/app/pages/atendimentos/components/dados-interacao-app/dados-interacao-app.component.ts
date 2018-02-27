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
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>${atendimento.cliente.nome_razao_social} - ${atendimento.cliente.cnpj_cpf}</title>
          <style>

            header nav, footer {
              display: none;
            }

            img {
              height: 80px;
              width: auto;
            }
            @page {
              margin: 0.3cm;
            }
            body {
                background: #FFF;
                color: #000;
                font-family: Georgia, serif;
                line-height: 1;
            }

            p {
              margin: 0 0 1000px;
            }

            h4 {
              font-size:1.1em;
              font-weight: normal;
              margin: 2em 0 0.5em;
            }
            .assinatura {
              height: 120px;
              width: auto;
            }
            .no-print {
              display:none;
            }

          </style>
          <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossorigin="anonymous">
          <script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
           crossorigin="anonymous"></script>
          <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
          integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
          crossorigin="anonymous"></script>
          <script
          src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
          integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
          crossorigin="anonymous"></script>
        </head>
       <body onload="window.print();window.close()">
         ${printContents}
       </body>
      </html>`
    );
    popupWin.document.close();
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
        const src = `http://165.227.78.113:3000/atendimentoimagens/${img}`;
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
