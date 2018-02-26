import * as jsPDF from 'jspdf';
import { Monitoramento } from '../../../models/';
import { LOGO_REALPONTO } from '../utils/logo-realponto';
import { parseCnpjCpf, dataToString, horaToString } from '../utils/parse-dados';

let doc; 

export const gerarRelatorio = funcionario => {
  doc = new jsPDF('landscape');
  header(doc, funcionario);
  preencherTabela(funcionario.monitoramentos);
  doc.text(228, 195, 'Assinatura: ______________');
  doc.save(
    `${dataToString(funcionario.monitoramentos[0].data_hora_inicial_km)} - ${funcionario.nome}`
  );
};

// tslint:disable-next-line:no-shadowed-variable
const header = (doc, funcionario) => {
  doc.addImage(LOGO_REALPONTO, 'PNG', 10, 3, 60, 20);
  doc.setFontSize(18);
  doc.text(115, 15, 'Controle de Visita Técnica ');
  doc.text(115, 17, '_____________________');
  doc.setFontSize(12);
  doc.text(13, 32, `Técnico: ${funcionario.nome}`);
  doc.text(132, 32, `Data: ${
    dataToString(funcionario.monitoramentos[0].data_hora_inicial_km)
  }`);
  doc.text(233, 32, 'Veículo: ______________');
  doc.setLineWidth(0.1);
  doc.setDrawColor(197, 193, 207);
  doc.line(300, 40, 0, 40);
};

const preencherTabela = (monitoramentos: Monitoramento[]) => {
  const columns = [
    { title: 'Cliente', dataKey: 'nome_razao_social' },
    // { title: 'CNPJ/CPF', dataKey: 'cnpj_cpf' }, 
    { title: 'Tipo', dataKey: 'tipo' }, 
    { title: 'Km Início', dataKey: 'km_inicial' }, 
    { title: 'Km Final', dataKey: 'km_final' }, 
    { title: 'Hora Km Início', dataKey: 'data_hora_inicial_km' }, 
    { title: 'Hora Km Final', dataKey: 'data_hora_final_km' } 
  ];  

  const rows = monitoramentos.map(monitoramento => {
    const parseDados = {
      cnpj_cpf: parseCnpjCpf(monitoramento.cnpj_cpf),
      data_hora_inicial_km: horaToString(monitoramento.data_hora_inicial_km),
      data_hora_final_km: horaToString(monitoramento.data_hora_final_km)
    };
    return { ...monitoramento, ...parseDados };
  });

  doc.autoTable(columns, rows, {
    margin: { top: 45 },
    styles: {
      fontSize: 10
    }
  });
};

