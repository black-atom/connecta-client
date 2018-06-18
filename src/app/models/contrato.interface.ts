import { Cliente, EnderecoCliente, ContatoCliente } from './cliente.interface';

export interface EquipamentoContrato {
  modelo: string;
  fabricante: string;
  numeroSerie: number;
  visita: boolean;
  valor: number;
  endereco: EnderecoCliente;
}

export interface Proposta {
  descricao: string;
  valor: number;
  equipamentos: EquipamentoContrato[];
  criadoEm: Date;
  encerradoEm: Date;
  ativo: boolean;
}

export interface ContratoSchema {
  _id: string;
  cliente: Cliente;
  endereco: EnderecoCliente;
  contato: ContatoCliente;
  tipo: string;
  dataAdesao: Date;
  dataEncerramento: Date;
  valor: number;
  propostas: Proposta[];
  ativo: boolean;
}
