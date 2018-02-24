export interface Atendimento {
  _id: string;
  cliente: Cliente;
  endereco: EnderecoAtendimento;
  contato: ContatoAtendimento;
  tecnico: TecnicoAtendimento;
  avaliacao: Avaliacao[];
  imagens: Imagens[];
  data_atendimento: Date;
  estacionamento: string;
  modelo_equipamento: string;
  numero_equipamento: string;
  tipo: string;
  descricao: string;
  testes_efetuados: string;
  observacao: string;
  valor: string;
  autorizado: string;
  garantia: string;
  estado: string;
  interacao_tecnico: InteracaoTecnico;
  motivos: Motivo[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

interface Motivo {
  estado: string;
  motivo: string;
}

interface Cliente {
  _id: number;
  cnpj_cpf: string;
  nome_razao_social: string;
  nome_fantasia?: string;
  inscricao_estadual?: string;
}

interface EnderecoAtendimento {
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  ponto_referencia: string;
  complemento: string;
}

interface ContatoAtendimento {
  nome: string;
  email: string;
  telefone: string;
  celular: string;
  observacao: string;
}

interface TecnicoAtendimento {
  _id: string;
  nome: string;
}

interface Avaliacao {
  pergunta: string;
  valor: number;
}

interface Imagens {
  tipo: string;
  url: string;
}

interface InteracaoTecnico {
  estado: string;
  relatorio_tecnico: RelatorioTecnico;
  retorno: Retorno;
  treinamento: Treinamento;
  remocao_relogio: RemocaoRelogio;
}

interface RelatorioTecnico {
  relatorio: string;
}

interface Retorno {
  retornar: string;
  motivo: string;
}

interface Treinamento {
  treinamento: boolean;
  interrupcoes: boolean;
  cadastros: boolean;
  relatorios: boolean;
  importacao_dados: boolean;
  parametros_gerais: boolean;
  abonos_justificativas: boolean;
  backup_sistema: boolean;
  software: string;
  caminho: string;
}

interface RemocaoRelogio {
  retirado: boolean;
  chave: boolean;
  bateria: boolean;
  bobina: boolean;
  fonte: boolean;
  pino: boolean;
  impressora: boolean;
  mesmo_equipamento: boolean;
  informacoe_equipamento: string;
}

interface Faturamento {
  mesmo_cnpj: boolean;
  cnpj: string;
  nome_razao_social: string;
  email: string;
  quem_aprovou: string;
  valor: string;
  prazo_pagamento: string;
}
