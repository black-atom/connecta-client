import { Input } from '@angular/core';
import { Component } from '@angular/core';

import { equipamentosTemporarios } from './../../equipamento.mock.temp';

@Component({
  selector: 'app-equipamentos-contrato',
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamento.component.scss']
})

export class EquipamentosContratoComponent {

  @Input()
  public equipamentoControl;

  @Input()
  public clienteEncontrado;

  public enderecoEscolhido;
  public equipamentos = equipamentosTemporarios;

  enderecoSelecionado(endereco) {
    this.equipamentoControl.get('endereco.complemento').patchValue(endereco.complemento);
    this.equipamentoControl.get('endereco.uf').patchValue(endereco.uf);
    this.equipamentoControl.get('endereco.rua').patchValue(endereco.rua);
    this.equipamentoControl.get('endereco.bairro').patchValue(endereco.bairro);
    this.equipamentoControl.get('endereco.cep').patchValue(endereco.cep);
    this.equipamentoControl.get('endereco.cidade').patchValue(endereco.cidade);
    this.equipamentoControl.get('endereco.numero').patchValue(endereco.numero);
    this.equipamentoControl.get('endereco.ponto_referencia').patchValue(endereco.ponto_referencia);
  }


}

