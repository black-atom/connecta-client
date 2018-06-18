import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-equipamentos',
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.scss']
})
export class EquipamentosComponent implements OnInit {

  @Input()
  contratoSelecionadoEquipamentos;
  public propostaAtiva;

  constructor() { }

  ngOnInit() {
    this.getPropostaAtiva();
  }

  getPropostaAtiva() {
    const { propostas } = this.contratoSelecionadoEquipamentos;
    const filtarProposta = proposta => proposta.ativo === true;
    this.propostaAtiva = propostas.find(filtarProposta);
  }

}
