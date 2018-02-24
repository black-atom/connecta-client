import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Funcionario } from './../../../../models';

@Component({
  selector: 'app-modal-funcionario',
  templateUrl: './modal-funcionario.component.html',
  styleUrls: ['./modal-funcionario.component.scss']
})
export class ModalFuncionarioComponent implements OnInit {

  @Input() funcionarioSelecionado: Funcionario;

  constructor(public modalAtiva: NgbActiveModal) { }

  ngOnInit() {
  }

  fecharModal() {
    this.modalAtiva.close();
  }

}
