import { Cliente, EnderecoCliente, ContatoCliente } from './cliente.interface';

export interface EquipamentoContrato {
  _id: string;
  valor: 200;
  visita: false;
  numeroSerie: string;
  fabricante: string;
  modelo: string;
  categoria: string;
  descricao: string;
  cnpjCliente: string;
  encerradoEm?: string;
  motivo?: string;
  imagemPath?: string;
  endereco?: EnderecoProduto;
}

export interface EnderecoProduto {
  complemento: string;
  ponto_referencia: string;
  cep: string;
  uf: string;
  cidade: string;
  bairro: string;
  numero: string;
  rua: string;
}

export interface Proposta {
  _id: string;
  ativo: boolean;
  encerradoEm: Date;
  criadoEm: Date;
  descricao: string;
  valor: number;
  equipamentos: EquipamentoContrato[];
}

export interface Contrato {
  _id: string;
  cliente: Cliente;
  endereco: EnderecoCliente;
  contato: ContatoCliente;
  tipo: string;
  dataAdesao: Date;
  diaVencimento: number;
  dataEncerramento: Date;
  resumoContrato: string;
  numeroContrato: string;
  valor: number;
  propostas: Proposta[];
  ativo: boolean;
  financeiro: Financeiro[];
  cnpjAssociados: Cliente[];
}

export interface Financeiro {
  _id: string;
  mesVirgente: string;
  status: string;
  observacao: string;
  descricao: string;
  valor: number;
}
