export interface Cliente {
  _id: string;
  nome_razao_social: string;
  cnpj_cpf: string;
  email: string;
  nome_fantasia: string;
  inscricao_estadual: string;
  enderecos: EnderecoCliente[];
  contatos: ContatoCliente[];
}

export interface ContatoCliente {
  _id: string;
  telefone: string;
  celular: string;
  nome: string;
  email?: string;
  observacao?: string;
  createdAt: string;
  updatedAt: string;
  cliente_id: number;
}

export interface EnderecoCliente {
  _id: string;
  rua: string;
  complemento: string;
  bairro: string;
  cidade: string;
  numero: string;
  uf: string;
  ponto_referencia?: string;
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
