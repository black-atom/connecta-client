export interface Funcionario {
  _id?: string;
  createdAt: string;
  updatedAt: string;
  nome: string;
  endereco: EnderecoFuncionario;
  cpf: string;
  rg: string;
  data_nasc: string;
  habilitacao: Habilitacao;
  tipo: string[];
  photo_url: string;
  contato: ContatoFuncionario;
}

interface Login {
  username: string;
  password: string;
}

interface Habilitacao {
  numero: string;
  validade: string;
}

export interface ContatoFuncionario {
  email: string;
  telefone: string;
  celular: string;
  login: Login;
  observacao: string;
}

interface EnderecoFuncionario {
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
