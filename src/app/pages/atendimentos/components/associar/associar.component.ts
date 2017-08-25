import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { Atendimento } from './../../../../models';
import { Funcionario } from './../../../../models';
import { AtendimentosDisponiveisComponent } from './atendimentos-disponiveis';
import { FuncionarioService } from './../../../../shared/services';


@Component({
  selector: 'app-associar',
  templateUrl: './associar.component.html',
  styleUrls: ['./associar.component.scss']
})
export class AssociarComponent implements OnInit {

  public atendimentos: Atendimento[] = [];
  public atendimentoASerRemovido;
  public tecnicoSelecionado: string;
  public tecnicos: Funcionario[];

  opcoesModalAtendimentos: NgbModalOptions = {
    size: 'lg'
  };

  
  constructor(private _funcionarioService: FuncionarioService,
              private _servicoModal: NgbModal) {}


  ngOnInit() {
      this._funcionarioService.retornarFuncionarioPorFuncao('Técnico')
      .subscribe(res => this.tecnicos = res);
  }


  abrirModal(tecnicoSelecionado) {

    const modalRef = this._servicoModal
                    .open(AtendimentosDisponiveisComponent, this.opcoesModalAtendimentos);

    modalRef.componentInstance.tecnicoSelecionado = tecnicoSelecionado;

  //   modalRef.result.then((resultadoDaModal) => {

  //       const tecnicoProcurado = this.funcionarios
  //         .find(tecnico => tecnico.nome === funcionarioSelecionado.nome);
  //              resultadoDaModal.forEach((atendimento) => {

  //   }).catch((e) => {
  //       console.log(e);
  //   });
  // });
}

}


//   abrirModalDeConfirmacao(conteudo, atendimento, funcionario) {
//     this.funcionarioSelecionado = funcionario;
//     this.atendimentoASerRemovido = atendimento;
//     this._servicoModal.open(conteudo);
//  }}
