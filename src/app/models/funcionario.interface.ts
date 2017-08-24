export interface Funcionario {
  _id?: string;
  createdAt: string;
  updatedAt: string;
  nome: string;
  endereco: Endereco;
  cpf: string;
  rg: string;
  data_nasc: string;
  habilitacao: Habilitacao;
  tipo: string[];
  photo_url: string;
  contato: Contato;
}

interface Login {
  username: string;
  password: string;
}

interface Habilitacao {
  numero: string;
  validade: string;
}

export interface Contato {
  email: string;
  telefone: string;
  celular: string;
  login: Login;
  observacao: string;
}

interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  uf: string;
  cidade: string;
  cep: string;
  _id: string;
  ponto_referencia: string;
  complemento: string;
}
