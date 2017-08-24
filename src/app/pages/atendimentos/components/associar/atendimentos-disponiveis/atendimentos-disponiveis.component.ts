import { Component, OnInit, Input } from '@angular/core';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// import { Funcionario } from './../../../../../models';
// import { Atendimento } from './../../../../../models';
// import { AtendimentoService } from './../../../../../shared/services';

@Component({
  selector: 'app-atendimentos-disponiveis',
  templateUrl: './atendimentos-disponiveis.component.html',
  styleUrls: ['./atendimentos-disponiveis.component.scss']
})
export class AtendimentosDisponiveisComponent implements OnInit {

  // @Input() 
  // tecnicoSelecionado: Tecnico;

  // public atendimentos: Atendimento[];
  // public selecionados: any[] = [];
  // public atendimentoVinculado: Atendimento[] = [];

 
  constructor( ) { }
  // public activeModal: NgbActiveModal,
  // private _atendimentoService: AtendimentoService
  ngOnInit() {
  }
  //  );this._atendimentoService.retornarTodos()
  //  .subscribe(res => this.atendimentos = res
  

  // /**
  //  *   Percorre cada item do array "selecionados" verificando se o elemento 
  //  *   que o usuário clicou já existe. Se não existir o elemento é adicionado
  //  */
   
  // getAtendimento(atendimento) {
  //   const isIgual = this.selecionados.find(elemento => elemento === atendimento);
  //   if (!isIgual) {
  //     this.selecionados.push(atendimento);
  //   }
  // }

  // /**
  //  * Percorre cada item do vetor de "selecionados" e alterando o nome do técnico para o técnico
  //  * de interesse e por fim adiciona todo o objeto em um novo array.
  //  */
  
    
  // associarAtendimento() {
  //  const adicionarTecnico = this.selecionados.map((item) => {
  //       item.tecnico = this.tecnicoSelecionado; 
  //         if (item.tecnico) {
  //             this.atendimentos
  //                       .splice(this.atendimentos
  //                       .indexOf(item), 1);
  //         }
  //       console.log(this.tecnicoSelecionado); 
  //   });
  //   this.activeModal.close(adicionarTecnico);
  // }
  

  // // Método para apenas fechar a modal sem nenhum interesse de manipulação de dados
  // closeModal() {
  //   this.activeModal.dismiss();
  // }
}
