import { Atendimento } from './atendimento.interface';

export interface Tecnico {
    id: number;
    nome: string;
    rg: string;
    cpf: string;
    data_nasc: string;
    email: string;
    telefone: string;
    celular: string;
    observacao: string;
    cnh: string;
    validade_carteira: string;
    rua: string;
    numero: string;
    complemento: string;
    ponto_referencia: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    createdAt: string;
    updatedAt: string;
    atendimentos: Atendimento[];
}
