export interface Cliente {
  id: number;
  razao_social: string;
  cnpj_cpf: string;
  email: string;
  nome_fantasia: string;
  inscricao_estadual: string;
  createdAt: string;
  updatedAt: string;
  enderecos: Endereco[];
  contatos: Contato[];
}

export interface Contato {
  id: number;
  telefone: string;
  nome: string;
  email?: any;
  obervacao?: any;
  createdAt: string;
  updatedAt: string;
  cliente_id: number;
}

export interface Endereco {
  id: number;
  rua: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  ponto_refencia?: any;
  cep: string;
  createdAt: string;
  updatedAt: string;
  cliente_enderecos?: Clienteenderecos;
}

interface Clienteenderecos {
  createdAt: string;
  updatedAt: string;
  cliente_id: number;
  endereco_id: number;
}
