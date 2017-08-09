import { AtendimentoModel } from './../../../../models/atendimento/atendimento.interface';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { TecnicoModel } from '../../../../models/tecnico/tecnico.interface';
import { TECNICOSMOCK } from './../../../../utils/mocks/tecnicos.mock';
import { AtendimentosDisponiveisComponent } from './atendimentos-disponiveis/atendimentos-disponiveis.component';

@Component({
  selector: 'app-associar',
  templateUrl: './associar.component.html',
  styleUrls: ['./associar.component.scss'],
})
export class AssociarComponent implements OnInit {
  tecnicos: TecnicoModel[] = TECNICOSMOCK;
  atendimentos: AtendimentoModel[] = [];

  options: NgbModalOptions = {
    size: 'lg',
  };

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  abrirModal(tecnicoSelecionado) {

    const modalRef = this.modalService
                    .open(AtendimentosDisponiveisComponent, this.options);

    modalRef.componentInstance.tecnicoSelecionado = tecnicoSelecionado;

    modalRef.result.then(resultadoDaModal => {

        const procuraPeloTecnico = this.tecnicos
          .find(tecnico => tecnico.nome === tecnicoSelecionado);

        resultadoDaModal.forEach(atendimento => {

          const verificaAtendimentoExiste = procuraPeloTecnico.atendimentos
          .find((atendimentoTecnico) => atendimentoTecnico  === atendimento);

          if ( verificaAtendimentoExiste === undefined ) {
              procuraPeloTecnico.atendimentos.push(atendimento);
          }
        });
    });
  }
  
  removerAtendimento(atendimento, tecnico) { 
    /*
        Verifica se o técnico do atendimento
        é o mesmo que o técnico em que o usuário pretende remover

        Se for o mesmo, é retornado o valor.
    */
    const verificaAtdClicadoTecnicoIsIgual = 
        atendimento.tecnico.find((nome) => nome === tecnico);
        
    /*
        Verifica se o técnico do atendimento armazenado
        é o mesmo que o técnico em que o usuário pretende remover
    */
     const verificaAtdArmazenadoTecnicoIsIgual = 
        this.tecnicos.find((tecnicoProcurado) => 
                    tecnicoProcurado.nome === verificaAtdClicadoTecnicoIsIgual);
  
    /*
      Executando um laço no array de atendimentos do técnico obtendo
      o índice do atendimento a ser removido

    */
      for (const i in verificaAtdArmazenadoTecnicoIsIgual.atendimentos) {
        if (verificaAtdArmazenadoTecnicoIsIgual.atendimentos[i] === atendimento) {
          
          verificaAtdArmazenadoTecnicoIsIgual.atendimentos
          .splice(verificaAtdArmazenadoTecnicoIsIgual.atendimentos.indexOf(atendimento), 1);
        }
      }
    }
  }

