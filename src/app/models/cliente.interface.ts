export interface Cliente {
  id: string;
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
  id: string;
  telefone: string;
  nome: string;
  email?: any;
  obervacao?: any;
  createdAt: string;
  updatedAt: string;
  cliente_id: number;
}

export interface Endereco {
  id: string;
  rua: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
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
