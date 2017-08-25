import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Funcionario } from './../../../../../models';
import { Atendimento } from './../../../../../models';
import { AtendimentoService } from './../../../../../shared/services';

@Component({
  selector: 'app-atendimentos-disponiveis',
  templateUrl: './atendimentos-disponiveis.component.html',
  styleUrls: ['./atendimentos-disponiveis.component.scss']
})
export class AtendimentosDisponiveisComponent implements OnInit {

  @Input() 
  funcionarioSelecionado: Funcionario;

  public atendimentos: Atendimento[];
  public selecionados: any[] = [];
  public atendimentoVinculado: Atendimento[] = [];

 
  constructor(public activeModal: NgbActiveModal,
              private _atendimentoService: AtendimentoService) { }
  
  ngOnInit() {
  }

  buscarPorData(data) {
    this._atendimentoService.retornarAtendimentoPorData(data)
    .subscribe(res => this.atendimentos = res);
  }

  fecharModal() {
    this.activeModal.dismiss();
  }
}
