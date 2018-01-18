import { Component, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs/Rx';

import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Atendimento, Funcionario } from './../../../../../models';
import { AtendimentoService } from './../../../../../shared/services';

@Component({
  selector: 'app-atendimentos-disponiveis',
  templateUrl: './atendimentos-disponiveis.component.html',
  styleUrls: ['./atendimentos-disponiveis.component.scss']
})
export class AtendimentosDisponiveisComponent implements OnInit {

  @Input()
  funcionarioSelecionado: Funcionario;

  @Input()
  dataSelecionada;

  private subscription: Subscription;
  public isCollapsed = false;
  public selecionados: any[] = [];
  public atendimentos$: Observable<Atendimento[]>;
  public expandedRowIndex = -1;

  constructor(public _activeModal: NgbActiveModal,
              private _atendimentoService: AtendimentoService
             ) {}

  ngOnInit() {
   this.atendimentos$ = this._atendimentoService.getAtendimentosPorData(this.dataSelecionada);
  }

  changeExpanded(id){
    this.expandedRowIndex === id ? this.expandedRowIndex = -1 : this.expandedRowIndex = id
  }

  selecionarAtendimento(atendimento) {
    const isIgual = this.selecionados.find(atendimentoSelecionado => atendimentoSelecionado === atendimento);

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

}
