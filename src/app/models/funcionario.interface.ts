import { Atendimento } from './atendimento.interface';
import { Contato, Endereco, HistoricoUsuario } from './utils';
import { DadosLogin } from './';

export interface Funcionario {
  _id: string;
  nome: string;
  contato: Contato;
  endereco: Endereco;
  cpf: string;
  rg: string;
  data_nasc: string;
  habilitacao: Habilitacao;
  foto_url: string;
  login: DadosLogin;
  atendimentos?: Atendimento[];
  atendimentos_hoje?: Atendimento[];
  concluido: Atendimento[];
  media: number;
  estado: string;
  HistoricoUsuario;

}

interface Habilitacao {
  numero: string;
  validade: string;
}

