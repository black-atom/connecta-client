import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Rx';

import { Funcionario } from './../../../../../models';
import { Atendimento } from './../../../../../models';
import { AtendimentoService } from './../../../../../shared/services';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';

@Component({
  selector: 'app-atendimentos-disponiveis',
  templateUrl: './atendimentos-disponiveis.component.html',
  styleUrls: ['./atendimentos-disponiveis.component.scss']
})
export class AtendimentosDisponiveisComponent implements OnInit, OnDestroy {

  @Input() funcionarioSelecionado: Funcionario;

  private sub: Subscription;
  public atendimentos: Atendimento[];
  public selecionados: any[] = [];
  public atendimentoVinculado: Atendimento[] = [];
  public campoData: NgbDateStruct;

  constructor(
    public _activeModal: NgbActiveModal,
    private _atendimentoService: AtendimentoService,
    private _ngbDateParserFormatter: NgbDateParserFormatter
  ) {}

  ngOnInit() {
    this.retornarTodosAtendimentos();
  }

  retornarTodosAtendimentos() {
    this.sub = this._atendimentoService
      .retornarTodos()
      .subscribe(res => (this.atendimentos = res));
  }

  selecionarAtendimento(atendimento) {
    this.selecionados.push(atendimento);
  }

  associarAtendimento() {

  }

  buscarPorData(data) {
      data = this._ngbDateParserFormatter.format(this.campoData);
      
          this.sub = this._atendimentoService
            .retornarAtendimentoPorData(data)
            .subscribe(res => (this.atendimentos = res));
  }

  buscarPorNome(nome) {
    this.atendimentos = this.atendimentos.filter(elemento => {
      return (
        elemento.razao_social.toLowerCase().indexOf(nome.toLowerCase()) > -1
      );
    });
  }

  fecharModal() {
    this._activeModal.dismiss();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
