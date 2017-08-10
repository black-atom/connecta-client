import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { AtendimentoModel } from './../../../../models/atendimento/atendimento.interface';
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
  atendimentoRemovido;

  optionsModal: NgbModalOptions = {
    size: 'lg',
  };

  optionsNg2Notifications = {
    position: ['top', 'right'],
    timeOut: 5000,
    lastOnBottom: true,
  };

  constructor(private modalService: NgbModal, private _notify: NotificationsService) {}

  ngOnInit() {}

  criarNotificacao() {
    this._notify.info (
       'Atendimento removido:',
       `Cliente: ${this.atendimentoRemovido.razao_social}`,
      {
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: true,
        maxLength: 70,
        animate: 'fromLeft',
      }
    );
  }

  abrirModal(tecnicoSelecionado) {

    const modalRef = this.modalService
                    .open(AtendimentosDisponiveisComponent, this.optionsModal);

    modalRef.componentInstance.tecnicoSelecionado = tecnicoSelecionado;
    
    modalRef.result.then((resultadoDaModal) => {

        const tecnicoProcurado = this.tecnicos
          .find(tecnico => tecnico.nome === tecnicoSelecionado);

        resultadoDaModal.forEach((atendimento) => {

          const atendimentoVerificado = tecnicoProcurado.atendimentos
          .find((atendimentoTecnico) => atendimentoTecnico  === atendimento);

          if ( atendimentoVerificado === undefined ) {
              tecnicoProcurado.atendimentos.push(atendimento);
          }
        });
    }).catch((e) => {
        return e;
    });
  }
  
  removerAtendimento(atendimento, tecnico) { 
    
    // Verificando se nome técnico é = técnico do atendimento
    const tecnicoAtendimentoClicado = atendimento.tecnico
                            .find((nome) => nome === tecnico);
        
    // Verificando se técnico armazenado é o mesmo do atd clicado
     const tecnicoArmazenado = this.tecnicos
                            .find((tecnicoProcurado) => 
                            tecnicoProcurado.nome === tecnicoAtendimentoClicado);
  
    // Removendo o atendimento do técnico
      tecnicoArmazenado.atendimentos
                           .splice(tecnicoArmazenado.atendimentos
                           .indexOf(atendimento), 1);
                           
     // Removendo o técnico do atendimento
      atendimento.tecnico
                          .splice(atendimento.tecnico
                          .indexOf(tecnico), 1);

      /**
        * Gravando o nome do cliente removido em uma variável
        * a fim de ser utilizado no ng2-notification
      */
      this.atendimentoRemovido = atendimento;
      }
  }

