import * as jsPDF from 'jspdf';

const doc = new jsPDF('landscape');
let positionY: number = 10;

export const gerarRelatorio = funcionario => {
  preencherRelatório(funcionario.monitoramentos);
  doc.save(`${funcionario.nome}`);
};

const createMonitoramento = async item => {
  console.log(item);
  await doc.text(15 , positionY, `monitoramento - > ${item.nome_razao_social}`);
  positionY += 10;
  console.log(positionY);  
};

const preencherRelatório = monitoramentos => {
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < monitoramentos.length; i++) {
    if (monitoramentos[i]) {
      positionY += 10;
      doc.text(15 , positionY, `monitoramento - > ${monitoramentos[i].nome_razao_social}`);
    }
  }
};
