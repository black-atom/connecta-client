import { Component, OnInit } from '@angular/core';
// import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
// import { NotificationsService } from 'angular2-notifications';

// import { Atendimento } from './../../../../models';
// import { Funcionario } from './../../../../models';
// import { AtendimentosDisponiveisComponent } from './atendimentos-disponiveis';
// import { FuncionarioService } from './../../../../shared/services';


@Component({
  selector: 'app-associar',
  templateUrl: './associar.component.html',
  styleUrls: ['./associar.component.scss']
})
export class AssociarComponent implements OnInit {

  // public atendimentos: Atendimento[] = [];
  // public atendimentoASerRemovido;
  // public funcionarioSelecionado: string;
  // public funcionarios: Funcionario[];

  // opcoesModalAtendimentos: NgbModalOptions = {
  //   size: 'lg'
  // };

  
  // constructor() {}private _funcionarioService: FuncionarioService,
  // private _servicoModal: NgbModal

  ngOnInit() {
      // this._funcionarioService.retornarTodos()
      //                     .subscribe(res => this.funcionarios = res);
  }

//   abrirModalDeConfirmacao(conteudo, atendimento, funcionario) {
//     this.funcionarioSelecionado = funcionario;
//     this.atendimentoASerRemovido = atendimento;
//     this._servicoModal.open(conteudo);
//  }
   
//   abrirModal(funcionarioSelecionado) {

//     const modalRef = this._servicoModal
//                     .open(AtendimentosDisponiveisComponent, this.opcoesModalAtendimentos);

//     modalRef.componentInstance.tecnicoSelecionado = funcionarioSelecionado;

//     modalRef.result.then((resultadoDaModal) => {

//         const tecnicoProcurado = this.funcionarios
//           .find(tecnico => tecnico.nome === funcionarioSelecionado.nome);
//                resultadoDaModal.forEach((atendimento) => {

//                     const atendimentoVerificado = tecnicoProcurado.atendimentos
//                     .find((atendimentoTecnico) => atendimentoTecnico  === atendimento);

//                     if ( atendimentoVerificado === undefined ) {
//                         tecnicoProcurado.atendimentos.push(atendimento);
//                     }
//          });

//     }).catch((e) => {
//         console.log(e);
//     });
//   }

//   removerAtendimento(atendimento, tecnico) {

//     // Verificando se nome técnico é = técnico do atendimento
//     const funcionarioAtendimentoClicado = atendimento.tecnico
//                             .find((nome) => nome === tecnico);

//     // Verificando se técnico armazenado é o mesmo do atd clicado
//      const funcionarioArmazenado = this.funcionarios
//                             .find((tecnicoProcurado) =>
//                             tecnicoProcurado.nome === funcionarioAtendimentoClicado);

//     // Removendo o atendimento do técnico
//       funcionarioArmazenado.atendimentos
//                            .splice(funcionarioArmazenado.atendimentos
//                            .indexOf(atendimento), 1);

//      // Removendo o técnico do atendimento
//       atendimento.tecnico
//                           .splice(atendimento.funcionario
//                           .indexOf(tecnico), 1);

//       }
  }

