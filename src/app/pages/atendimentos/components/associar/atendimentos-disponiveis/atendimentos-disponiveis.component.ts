import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  public formModalAtendimentos: FormGroup;
  private sub: Subscription;
  public atendimentos: Atendimento[];
  public selecionados: Atendimento[] = [];
  public atendimentoVinculado: Atendimento[] = [];
  public campoData: NgbDateStruct;
 
  constructor(public _activeModal: NgbActiveModal,
              private _atendimentoService: AtendimentoService,
              private _ngbDateParserFormatter: NgbDateParserFormatter,
              private _fb: FormBuilder) { }
  
  ngOnInit() {
    this.retornarTodosAtendimentos();
    this.iniciarForm();
  }

  iniciarForm() {
    this.formModalAtendimentos = this._fb.group({
      busca_data: [''],
      busca_razao_social: ['']
    });
  }

  retornarTodosAtendimentos() {
    this.sub = this._atendimentoService
                   .retornarTodos()
                   .subscribe(res => this.atendimentos = res);

    if (this.campoData !== undefined || null) {
        this.campoData = null;
    }
  }

  buscarPorData() {
    const data = this._ngbDateParserFormatter.format(this.campoData);
  
    this.sub = this._atendimentoService
                   .retornarAtendimentoPorData(data)
                   .subscribe(res => this.atendimentos = res);

    return data;
  }

  buscarPorNome(nome) {
    this.atendimentos = this.atendimentos
                  .filter((elemento) => {
  
    return elemento.razao_social
                  .toLowerCase()
                  .indexOf(nome.toLowerCase()) > -1;
   });
  }

  cancelarBusca() {
    if (this.buscarPorData()) {
      return this.buscarPorData();
    } else {
      this.formModalAtendimentos.reset();
      this.retornarTodosAtendimentos();
    }
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
