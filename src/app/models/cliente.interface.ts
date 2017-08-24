export interface Cliente {
  id: string;
  razao_social: string;
  cnpj_cpf: string;
  email: string;
  nome_fantasia: string;
  inscricao_estadual: string;
  createdAt: string;
  updatedAt: string;
  enderecos: EnderecoCliente[];
  contatos: ContatoCliente[];
}

export interface ContatoCliente {
  id: string;
  telefone: string;
  nome: string;
  email?: any;
  obervacao?: any;
  createdAt: string;
  updatedAt: string;
  cliente_id: number;
}

export interface EnderecoCliente {
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
  cliente_enderecos?: ClienteEnderecos;
}

interface ClienteEnderecos {
  createdAt: string;
  updatedAt: string;
  cliente_id: number;
  endereco_id: number;
}
