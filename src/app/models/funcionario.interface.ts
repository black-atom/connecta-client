export interface Funcionario {
  _id?: string;
  criado_em: string;
  atualizado_em: string;
  nome: string;
  endereco: EnderecoFuncionario;
  cpf: string;
  rg: string;
  data_nasc: string;
  habilitacao: Habilitacao;
  foto_url: string;
  contato: ContatoFuncionario;
  login: Login;
}

interface Login {
  tipo: string[];
  username: string;
  password: string;
}

interface Habilitacao {
  numero: string;
  validade: string;
}

export interface ContatoFuncionario {
  _id: string;
  nome: string;
  email: string;
  telefone: string;
  celular: string;
  observacao: string;
}

interface EnderecoFuncionario {
  _id: string;
  rua: string;
  numero: string;
  bairro: string;
  uf: string;
  cidade: string;
  cep: string;
  ponto_referencia: string;
  complemento: string;
}
