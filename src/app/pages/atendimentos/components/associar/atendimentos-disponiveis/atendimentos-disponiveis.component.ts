import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TecnicoModel } from './../../../../../models/tecnico/tecnico.interface';
import { AtendimentoModel } from './../../../../../models/atendimento/atendimento.interface';
import { ATENDIMENTOSMOCK } from './../../../../../utils/mocks/atendimentos.mock';

@Component({
  selector: 'app-atendimentos-disponiveis',
  templateUrl: './atendimentos-disponiveis.component.html',
  styleUrls: ['./atendimentos-disponiveis.component.scss']
})
export class AtendimentosDisponiveisComponent implements OnInit {

  @Input() tecnicoSelecionado: TecnicoModel;
  atendimentos: AtendimentoModel[] = ATENDIMENTOSMOCK;
  selecionados: any[] = [];
  atendimentoVinculado: AtendimentoModel[] = [];

 
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  /**
   *   Percorre cada item do array "selecionados" verificando se o elemento 
   *   que o usuário clicou já existe. Se não existir o elemento é adicionado
   */
   
  getAtendimento(atendimento) {
    const isIgual = this.selecionados.find(elemento => elemento === atendimento);

    if (!isIgual) {
      this.selecionados.push(atendimento);
    }
  }

  /**
   * Percorre cada item do vetor de "selecionados" e alterando o nome do técnico para o técnico
   * de interesse e por fim adiciona todo o objeto em um novo array.
   */
  
    
  associarAtendimento() {
    this.atendimentoVinculado = this.selecionados
                                .map((item) => {

      const tecnicoComparado = item.tecnico
                                .find((tecnicoProcurado) => 
                                tecnicoProcurado === this.tecnicoSelecionado);
      
      if (!tecnicoComparado) {
        item.tecnico.push(this.tecnicoSelecionado); 

          if (item.tecnico.length > 0) {
              this.atendimentos
                        .splice(this.atendimentos
                        .indexOf(item), 1);
          }
      } 
        return item;     
    });
    this.activeModal.close(this.atendimentoVinculado);
  }
  
  // Método para apenas fechar a modal sem nenhum interesse de manipulação de dados
  closeModal() {
    this.activeModal.dismiss();
  }
}
