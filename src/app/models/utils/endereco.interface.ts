import { HistoricoUsuario } from './historico-usuario.interface';

export interface Endereco {
  _id: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  ponto_referencia?: string;
  cep: string;
  cliente_enderecos?: {
    HistoricoUsuario;
    cliente_id: number;
    endereco_id: number;
  };

}
