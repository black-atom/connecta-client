import { Tecnico } from './tecnico.interface';

export interface Atendimento {
    id: number;
    cnpj_cpf: string;
    razao_social: string;
    nome_fantasia?: string;
    inscricao_estadual: string;
    nome: string;
    email: string;
    telefone: string;
    celular: string;
    observacao: string;
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
    ponto_referencia: string;
    complemento: string;
    data_atendimento: string;
    tipo_atendimento: string;
    // tecnico: Tecnico[];
    descricao_atendimento: string;
    createdAt: string;
    updatedAt: string;
}
