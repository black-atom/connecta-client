import { TIPOFUNCIONARIOMOCK } from './../../../../utils/mocks/tipo-funcionario.mock';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs/Rx';

import { Atendimento } from './../../../../models';
import { Funcionario } from './../../../../models';
import { AtendimentosDisponiveisComponent } from './atendimentos-disponiveis';
import { FuncionarioService } from './../../../../shared/services';


@Component({
  selector: 'app-associar',
  templateUrl: './associar.component.html',
  styleUrls: ['./associar.component.scss']
})
export class AssociarComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  public atendimentos: Atendimento[] = [];
  public atendimentoASerRemovido;
  public funcionarioSelecionado: string;
  public funcionario: Funcionario[];
  public funcoes = TIPOFUNCIONARIOMOCK;

  opcoesModalAtendimentos: NgbModalOptions = {
    size: 'lg'
  };


  constructor(private _funcionarioService: FuncionarioService,
              private _servicoModal: NgbModal) {}


  ngOnInit() {
    this.retornarFuncionarioPorFuncao(TIPOFUNCIONARIOMOCK[2]);
  }

  retornarFuncionarioPorFuncao(funcao) {
    if (funcao === 'todos') {
      this.sub = this._funcionarioService
                     .retornarTodos()
                     .subscribe(res => this.funcionario = res);
    } else {
      this.sub = this._funcionarioService
                     .retornarFuncionarioPorFuncao(funcao)
                     .subscribe(res => this.funcionario = res);
    }
  }


  abrirModal(funcionarioSelecionado) {

    const modalRef = this._servicoModal
                    .open(AtendimentosDisponiveisComponent, this.opcoesModalAtendimentos);

    modalRef.componentInstance.funcionarioSelecionado = funcionarioSelecionado;

  //   modalRef.result.then((resultadoDaModal) => {

  //       const tecnicoProcurado = this.funcionarios
  //         .find(tecnico => tecnico.nome === funcionarioSelecionado.nome);
  //              resultadoDaModal.forEach((atendimento) => {

  //   }).catch((e) => {
  //       console.log(e);
  //   });
  // });
}

  ngOnDestroy() {
    if (this.sub) {
    this.sub.unsubscribe();
    }
  }

}


//   abrirModalDeConfirmacao(conteudo, atendimento, funcionario) {
//     this.funcionarioSelecionado = funcionario;
//     this.atendimentoASerRemovido = atendimento;
//     this._servicoModal.open(conteudo);
//  }}
