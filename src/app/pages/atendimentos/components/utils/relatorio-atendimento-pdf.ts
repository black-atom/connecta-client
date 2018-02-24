import { Atendimento } from '../../../../models';
import LOGO from './logo';

const dataToString = data => {
  const date = new Date(data);
  return `${date.getDate()}/${date.getMonth()}/ ${date.getFullYear()}`;
};

const checkTipo = (data) => {
  let valor = '';
  const tipos = {
    'Autorizado': 'Autorizado',
    'Garantia externa': 'Garantia externa',
    'Garantia laboratório': 'Garantia laboratório',
    'Garantia venda': 'Garantia venda',
    'NF - Avulso local': 'NF - Avulso local',
    'NF - Avulso online/telefone': 'NF - Avulso online/telefone',
    'NF - Registro de sistema': 'NF - Registro de sistema'
  };
  if (tipos[data.tipo]) {
    if (data.autorizado) {
      return valor = `Autorizado por: ${data.autorizado}`;
    }
    if (data.valor) {
      return valor = `R$ ${data.garantia}`;
    }
    if (data.garantia) {
      return valor = `Data Garantia: ${data.garantia}`;
    }
  }
  return '';
};

const falseToString = value => value ? 'Sim' : 'Não';
const isNull = value => value === null ? '' : value;

const pdf = (doc, dados: Atendimento) => {
  doc.setFontSize(40);
  doc.addImage(LOGO, 'PNG', 2, 3, 60, 20);
  doc.setFontSize(13);
  doc.text(68, 10, 'REALPONTO COMERCIO E SERVIÇO DE RELÓGIO DE PONTO');
  doc.setFontSize(9);
  doc.text(68, 15, 'R. DR CINCINATO BRAGA, 296 - PLANALTO, SÃO BERNARO DO CAMPO - SP');
  doc.setFontSize(9);
  doc.text(68, 20, '(011) 4332-4040 | (011) 4394-2140');

  doc.setLineWidth(0.1);
  doc.setDrawColor(197, 193, 207);
  doc.line(400, 25, 0, 25);

  doc.setFontSize(12);
  doc.text(5, 35, 'Informações principais');


  doc.setFontSize(9);
  doc.text(5, 45, `Data Atendimento: ${dataToString(dados.data_atendimento)}`);
  doc.text(5, 50, `Cliente: ${dados.cliente.nome_razao_social} - ${dados.cliente.cnpj_cpf}`);
  doc.text(5, 55, `Nome Fantasia: ${dados.cliente.nome_fantasia}`);
  doc.text(130, 55, `IE: ${dados.cliente.inscricao_estadual}`);
  doc.text(5, 65, `Contato: ${dados.contato.nome}`);
  doc.text(130, 65, `Telefone: ${dados.contato.telefone}`);
  doc.text(165, 65, `Celular: ${dados.contato.celular}`);

  // tslint:disable-next-line:max-line-length
  doc.text(5, 75, `Endereço: ${dados.endereco.rua}, ${dados.endereco.numero},${dados.endereco.bairro} - ${dados.endereco.cidade} - ${dados.endereco.cep}/ ${dados.endereco.uf}, `);
  doc.text(5, 80, `Complemento: ${dados.endereco.complemento}`);
  doc.text(5, 85, `Ponto de Referência: ${dados.endereco.ponto_referencia}`);
  doc.text(5, 90, `Estacionamento: ${dados.estacionamento}`);

  doc.setLineWidth(0.1);
  doc.setDrawColor(197, 193, 207);
  doc.line(400, 95, 0, 95);

  doc.setFontSize(12);
  doc.text(5, 105, 'Informações doAtendimento');

  doc.setTextColor(0);
  doc.setFontSize(9);
  doc.text(5, 115, `Tipo: ${dados.tipo}`);
  doc.text(130, 115, `${checkTipo(dados)}`);

  doc.text(5, 120, `Equipamento: ${dados.modelo_equipamento} - ${dados.numero_equipamento}`);
  doc.text(5, 125, `Problema: ${dados.descricao}`);
  doc.text(5, 135, `Testes Efetuados: ${dados.testes_efetuados}`);
  doc.text(5, 140, `Observação: ${dados.observacao}`);

  doc.setLineWidth(0.1);
  doc.setDrawColor(197, 193, 207);
  doc.line(400, 145, 0, 145);

  doc.setFontSize(12);
  doc.text(5, 155, 'Relatório Técnico Externo');

  doc.setTextColor(0);
  doc.setFontSize(9);
  doc.text(5, 165, `Técnico: ${isNull(dados.tecnico.nome)}`);
  doc.text(130, 165, `Status: ${dados.interacao_tecnico.estado}`);
  doc.text(5, 170, `Solução: ${dados.interacao_tecnico.relatorio_tecnico.relatorio}`);
  doc.text(5, 175, `Retornar: ${falseToString(dados.interacao_tecnico.retorno.retornar)}`);
  doc.text(5, 180, `Motivo: ${dados.interacao_tecnico.retorno.motivo}`);


  doc.setLineWidth(0.1);
  doc.setDrawColor(197, 193, 207);
  doc.line(400, 185, 0, 185);


  doc.setFontSize(12);
  doc.text(5, 195, 'Retirado Equipamento');

  doc.setTextColor(0);
  doc.setFontSize(9);
  doc.text(5, 200, `Retirado: ${falseToString(dados.interacao_tecnico.remocao_relogio.retirado)}`);
  doc.text(5, 205, `Mesmo Equipamento: ${falseToString(dados.interacao_tecnico.remocao_relogio.mesmo_equipamento)}`);
  doc.text(5, 210, `Informações do Equipamento: ${dados.interacao_tecnico.remocao_relogio.informacoe_equipamento}`);

  doc.setLineWidth(0.1);
  doc.setDrawColor(197, 193, 207);
  doc.line(400, 215, 0, 215);


  doc.setFontSize(12);
  doc.text(5, 225, 'Treinamento');

  doc.setTextColor(0);
  doc.setFontSize(9);
  doc.text(5, 230, `Software: ${dados.interacao_tecnico.treinamento.software}`);
  doc.text(90, 230, `Caminho: ${dados.interacao_tecnico.treinamento.caminho}`);
  doc.text(5, 235, `Cadastro: ${falseToString(dados.interacao_tecnico.treinamento.cadastros)}`);
  doc.text(90, 235, `Backup do Sistema: ${falseToString(dados.interacao_tecnico.treinamento.backup_sistema)}`);
  doc.text(150, 235, `Importação dados: ${falseToString(dados.interacao_tecnico.treinamento.importacao_dados)}`);
  doc.text(5, 240, `Interrupções: ${falseToString(dados.interacao_tecnico.treinamento.interrupcoes)}`);
  doc.text(90, 240, `Relatórios: ${falseToString(dados.interacao_tecnico.treinamento.relatorios)}`);
  doc.text(150, 240, `Abonos e Justificativas: ${falseToString(dados.interacao_tecnico.treinamento.abonos_justificativas)}`);

  doc.save(`${dados.cliente.nome_razao_social} - ${dados.cliente.cnpj_cpf} - ${dataToString(dados.data_atendimento)}.pdf`);
};

export default pdf;

