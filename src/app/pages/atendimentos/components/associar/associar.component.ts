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
  tecnico: any;

  options: NgbModalOptions = {
    size: 'lg',
  };

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  abrirModal(tecnicoSelecionado) {

    const modalRef = this.modalService.open(AtendimentosDisponiveisComponent, this.options);
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

  removerAtendimento(atendimento) {
     const remover = this.tecnicos.map(elemento => elemento.atendimentos.splice(atendimento, 1));
     console.log(remover);
  }
}
