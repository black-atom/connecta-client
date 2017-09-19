import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { AtendimentoService } from './../../../../shared/services';
import { Atendimento } from './../../../../models';


@Component({
  selector: 'app-dados-interacao-app',
  templateUrl: './dados-interacao-app.component.html',
  styleUrls: ['./dados-interacao-app.component.scss']
})
export class DadosInteracaoAppComponent implements OnInit {

  private id: string;
  private sub: Subscription;
  public atendimento: any;

  constructor(private _activatedRoute: ActivatedRoute,
              private _atendimentoService: AtendimentoService) { }

  ngOnInit() {
    this.obterIdAtendimento();
  }


  obterIdAtendimento() {
    this._activatedRoute.params.subscribe(params => this.id = params['id']);
    this.recuperarAtendimento();
  }

  recuperarAtendimento() {
    this.sub = this._atendimentoService.retornarUm(this.id).subscribe((res) => {
      this.atendimento = res;
      console.log(res);
    });
  }
}
