import { Atendimento } from './atendimento.interface';

export enum AtividadeTipo {
  almoco = 'almoco',
  atendimento = 'atendimento',
  deslocamento_empresa = 'deslocamento_empresa',
  abastecimento = 'abastecimento',
  outros = 'outros'
}

export enum MonitoramentoStatuses {
  pendente = 'PENDENTE',
  pauseAtividade = 'PAUSE_ATIVIDADE',
  inicioAtividade = 'INICIO_ATIVIDADE',
  fimAtividade = 'FIM_ATIVIDADE',
  inicioDeslocamento = 'INICIO_DESLOCAMENTO',
  criarAtividade = 'CRIAR_ATIVIDADE',
  fimDeslocamento = 'FIM_DESLOCAMENTO',
  cancelaAtividade = 'CANCELA_ATIVIDADE'
}

export interface Monitoramento {
  status: MonitoramentoStatuses;
  date: Date;
  motivo?: string;
}

export interface Atividade {
  _id?: string;
  descricao: string;
  atividade_id: string;
  monitoramentos: Monitoramento[];
  tipo: AtividadeTipo;
  funcionario_id: string;
  atendimento_id?: string;
  atendimento?: Atendimento;
  status: MonitoramentoStatuses;
  synced: boolean;
  localCreatedAt?: Date;
  createdAt?: Date;
}

export interface MonitoramentoInfo {
  funcionarioName: string;
  totalPendentes: number;
  totalPausados: number;
  totalConcluidos: number;
  atividadeAtual: Atividade;
}

export const statuses = {
  PENDENTE: 'pendente',
  PAUSE_ATIVIDADE: 'pausado',
  INICIO_ATIVIDADE: 'execucao',
  FIM_ATIVIDADE: 'concluido',
  INICIO_DESLOCAMENTO: 'execucao',
  FIM_DESLOCAMENTO: 'execucao',
  CANCELA_ATIVIDADE: 'concluido',
  CRIAR_ATIVIDADE: 'execucao'
};
