export interface Contato {
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
