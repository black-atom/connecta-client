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

  @Input()
  funcionarioSelecionado: Funcionario;


  @Input()
  dataAssociar;

  private sub: Subscription;
  public atendimentos: Atendimento[];
  public selecionados: any[] = [];
  public atendimentoVinculado: Atendimento[] = [];
  public campoData: NgbDateStruct;
  atendimentoRemover;

  constructor(public _activeModal: NgbActiveModal,
              private _atendimentoService: AtendimentoService,
              private _ngbDateParserFormatter: NgbDateParserFormatter) {}

  ngOnInit() {
    this.retornarTodosAtendimentos();
  }

  retornarTodosAtendimentos() {
    this.sub = this._atendimentoService
    .retornarAtendimentoPorData(this.dataAssociar)
      .subscribe((res) => {
      this.atendimentos = res.filter((atendimento) => {
          if (!atendimento.tecnico.nome) {
            return atendimento;
          }
        });
      });
  }

  selecionarAtendimento(atendimento) {
    const isIgual = this.selecionados
                        .find(atendimentoSelecionado =>
                              atendimentoSelecionado === atendimento);

    if (!isIgual) {
      this.selecionados.push(atendimento);
    } else {
      this.selecionados.splice(this.selecionados.indexOf(atendimento), 1);
    }

  }

  dessasociarAtendimento(atendimento) {
    if (this.selecionados.indexOf(atendimento) > -1) {
      return true;
    } else {
      return false;
    }
  }

  associarAtendimento() {
    this._activeModal.close(this.selecionados);
  }

  fecharModal() {
    this._activeModal.close();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
