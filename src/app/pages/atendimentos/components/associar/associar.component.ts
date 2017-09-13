import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { Observable, Subscription } from 'rxjs/Rx';
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
  public funcionarioSelecionado;
  public funcionario: Funcionario[];
  public funcoes = TIPOFUNCIONARIOMOCK;
  public funcao: string;

  public tecnicos$: Observable<Funcionario[]>;

  opcoesModalAtendimentos: NgbModalOptions = {
    size: 'lg'
  };


  constructor(private _funcionarioService: FuncionarioService,
              private _servicoModal: NgbModal,
              private _atendimentoService: AtendimentoService) {}


  ngOnInit() {

    this.retornarFuncionarioPorFuncao(TIPOFUNCIONARIOMOCK[2]);
    this.listarAtendimentoAssociado();
  }

  listarAtendimentoAssociado() {

    const today = new Date();
    const searchDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.tecnicos$ = this._atendimentoService.retornarAtendimentoPorData(searchDate)
    .switchMap(atendimentos => {
      return this._funcionarioService.retornarFuncionarioPorFuncao(this.funcao)
        .map(funcionarios => {

          return funcionarios.map(funcionario => {
            const atendimentoFuncionarios = atendimentos.filter(atendimento => atendimento.tecnico._id === funcionario._id);

            funcionario.atendimentos = atendimentoFuncionarios;
            return funcionario;
          });
        });
    });
    // .subscribe(funcionarios => console.log(funcionarios));
  }
  retornarTodosAtendimentos() {
    this._atendimentoService.retornarTodos()
                            .subscribe(res => this.atendimentos = res);
  }

  retornarFuncionarioPorFuncao(funcao) {
    this.funcao = funcao;
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
       this._atendimentoService
           .atualizarTodosAtendimentos(arrayDeAtendimentos)
           .subscribe((res) => {
             if(res){
              this.listarAtendimentoAssociado();
             }
            });
  });
}

abrirModalDeConfirmacao(conteudo, atendimento, funcionario) {
  this.funcionarioSelecionado = funcionario;
  this.atendimentoASerRemovido = atendimento;
  this._servicoModal.open(conteudo);
}

removerAtendimento(atendimento) {
 const nome = '';
atendimento.tecnico = { nome };
this._atendimentoService.atualizarAtendimento(atendimento).subscribe((res) => {
  if(res){
    this.listarAtendimentoAssociado();
  }
});
}

  ngOnDestroy() {
    if (this.sub) {
    this.sub.unsubscribe();
    }
  }

}
