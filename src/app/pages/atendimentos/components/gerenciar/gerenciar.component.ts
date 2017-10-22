import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AtendimentoService } from './../../../../shared/services';
import { Atendimento } from './../../../../models/atendimento.interface';
import { VisualizacaoModalComponent } from './../visualizacao-modal/visualizacao-modal.component';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./gerenciar.component.scss']
})
export class GerenciarComponent implements OnInit, OnDestroy {
    
    subscription: Subscription;
    atendimentos: Atendimento[];
    atendimentoSelecionado: Atendimento;    
    carregando: boolean = true;
  
    constructor(private _atendimentoService: AtendimentoService, private _servicoModal: NgbModal) {}

    opcoesModal: NgbModalOptions = {
      size: 'lg'
    };
  
    ngOnInit() {
      this.subscription = this._atendimentoService.retornarTodos().subscribe(atendimentos => {
       this.atendimentos = atendimentos
       this.carregando = false;
      })  
    }

    mudarEstiloLinha(dadosLinha: Atendimento) {


      if(dadosLinha.tipo === 'Aberto por técnica') {
        return 'aberto-por-tecnica'
      }

      else if (dadosLinha.situacao.status === 'cancelar') {
        return 'cancelado'
      }

      else if (dadosLinha.situacao.status === 'reagendar') {
        return 'reagendamento'
      } 
      
      else {
        return 'padrao'
      }

  }

  abrirModal(atendimentoSelecionado) {
      const referenciaModal = this._servicoModal.open(VisualizacaoModalComponent, this.opcoesModal);
      referenciaModal.componentInstance.atendimentoSelecionado = atendimentoSelecionado;
  }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  }
  
  
  
