import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { AtendimentoConcluidoDetalhesComponent } from './atendimento-concluido-detalhes/atendimento-concluido-detalhes.component';


@Component({
  selector: 'app-atendimentos-concluidos',
  templateUrl: './atendimentos-concluidos.component.html',
  styleUrls: ['./atendimentos-concluidos.component.scss']
})
export class AtendimentosConcluidosComponent implements OnInit {

  public atendimentos = [
    {
      data_atendimento: new Date(),
      isChecked: false,
      _id: 1,
      cliente: { nome_razao_social: 'Hello World', cnpj_cpf: '40555666000102' },
      tecnico: { _id: 1, nome: 'Alexnadre dos Santos' },
      status: 'Pendente',
      faturamento: { razao_social: 'Hello World', cnpj: '40555666000102', equipamentos: [] }
    },
    {
      data_atendimento: new Date(),
      isChecked: false,
      _id: 2,
      cliente: { nome_razao_social: 'Hello World', cnpj_cpf: '40555666000102' },
      tecnico: { _id: 1, nome: 'Alexnadre dos Santos' },
      status: 'Iniciado Atividade',
      faturamento: { razao_social: 'Hello World', cnpj: '40555666000102', equipamentos: [] }
    },
    {
      data_atendimento: new Date(),
      isChecked: false,
      _id: 3,
      cliente: { nome_razao_social: 'Hello World', cnpj_cpf: '40555666000102' },
      tecnico: { _id: 1, nome: 'Alexnadre dos Santos' },
      status: 'Concluido',
      faturamento: {
        razao_social: 'Hello World',
        cnpj: '40555666000102',
        equipamentos: [
          {
            modelo_equipamento: 'Relógio Orion 6B',
            numero_equipamento: '00004002547890548',
            pecas: [
              { descricao: 'Impressora', quantidade: 2, preco: 256.4 },
              { descricao: 'Leitor Biometrico', quantidade: 2, preco: 100 }
            ]
          }
        ]
      }
    },
    {
      data_atendimento: new Date(),
      isChecked: false,
      _id: 4,
      cliente: { nome_razao_social: 'Hello World', cnpj_cpf: '40555666000102' },
      tecnico: { _id: 1, nome: 'Alexnadre dos Santos' },
      status: 'Concluido',
      faturamento: { razao_social: 'Hello World', cnpj: '40555666000102', equipamentos: [] }
    },
    {
      data_atendimento: new Date(),
      isChecked: false,
      _id: 5,
      cliente: { nome_razao_social: 'Hello World', cnpj_cpf: '40555666000102' },
      tecnico: { _id: 1, nome: 'Alexnadre dos Santos' },
      status: 'Pausado',
      faturamento: { razao_social: 'Hello World', cnpj: '40555666000102', equipamentos: [] }
    }
  ];

  private opcoesModal: NgbModalOptions = {
    size: 'lg'
  };

  constructor(private _servicoModal: NgbModal) { }

  ngOnInit() {
  }

  abrirModalDeDetalhes(atendimentoSelecionado) {
    const atendimentoFound =
      this.atendimentos.find(atendimento => atendimento._id === atendimentoSelecionado);

    const referenciaModal = this._servicoModal.open(
      AtendimentoConcluidoDetalhesComponent,
      this.opcoesModal
    );
    referenciaModal.componentInstance.atendimentoSelecionado = atendimentoFound;

  }
}
