import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

import { AtendimentoService } from '../../../../shared/services/atendimento-service';
import { TIPOFUNCIONARIOMOCK } from './../../../../utils/mocks/tipo-funcionario.mock';
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
              private _servicoModal: NgbModal,
              private _atendimentoService: AtendimentoService) {}


  ngOnInit() {
    this.retornarFuncionarioPorFuncao(TIPOFUNCIONARIOMOCK[2]);
    const today = new Date();
    const searchDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this._atendimentoService.retornarAtendimentoPorData(searchDate)
    .switchMap(atendimentos => {
      console.log(atendimentos)
      return this._funcionarioService.retornarFuncionarioPorFuncao(TIPOFUNCIONARIOMOCK[2])
        .map(funcionarios => {

          return funcionarios.map(funcionario => {
            const atendimentoFuncionarios = atendimentos.filter(atendimento => atendimento.tecnico._id === funcionario._id);

            funcionario.atendimentos = atendimentoFuncionarios;
            return funcionario;
          });

        });
    })
    .subscribe(funcionarios => console.log(funcionarios));
  }

  retornarTodosAtendimentos() {
    this._atendimentoService.retornarTodos()
                            .subscribe(res => this.atendimentos = res);
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

    modalRef.result.then((resultadoDaModal) => {

      const arrayDeAtendimentos = resultadoDaModal.map((atendimento) => {
        const tecnico = {
          nome : funcionarioSelecionado.nome,
          _id : funcionarioSelecionado._id
        };
        return (Object.assign({}, atendimento, { tecnico }));
       });
       console.log(JSON.stringify(arrayDeAtendimentos));

       this._atendimentoService
           .atualizarTodosAtendimentos(arrayDeAtendimentos)
           .subscribe(res => console.log(res));
  });
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
