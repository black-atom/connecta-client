import { TIPOFUNCIONARIOMOCK } from './../../../../../utils/mocks/tipo-funcionario.mock';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FuncionarioService } from './../../../../../shared/services/funcionario-service/';

@Component({
  selector: 'app-acao',
  templateUrl: './acao.component.html',
  styleUrls: ['./acao.component.scss']
})
export class AcaoComponent implements OnInit {

  campoData: boolean;
  desativaCampoTecnico: boolean;
  action = ['reagendar', 'cancelar', 'encaixe'];
  tecnicos = [];
  tipoFuncao = TIPOFUNCIONARIOMOCK;

  @Input()
  formAcao: FormGroup;

  @Output()
  tecnicoEnviado = new EventEmitter();

  @Output()
  actionEnviada = new EventEmitter();

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit() {
    this.funcionarioService.retornarFuncionarioPorFuncao(this.tipoFuncao[2])
    .subscribe(
      res => {
        this.tecnicos = res;
      }
    );
  }

  actionAtendimento(action) {
    if (action === this.action[2]) {
       this.desativaCampoTecnico = true;
       this.actionEnviada.emit(true);
    }else if (action === this.action[0]) {
      this.desativaCampoTecnico = false;
      this.actionEnviada.emit(true);
    }else {
       this.desativaCampoTecnico = false;
       this.actionEnviada.emit(false);
    }
  }

  emitTecnico(tecnico) {
   this.tecnicoEnviado.emit(tecnico);
  }
}
