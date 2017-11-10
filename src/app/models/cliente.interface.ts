import { Contato, Endereco, IdentificacaoCliente, HistoricoUsuario } from './utils';

export interface Cliente {
  _id: string;
  nome_razao_social: string;
  cnpj_cpf: string;
  email: string;
  nome_fantasia: string;
  inscricao_estadual: string;
  enderecos: Endereco[];
  contatos: Contato[];
  HistoricoUsuario;

}
