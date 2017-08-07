import { AtendimentoModel } from './../atendimento/atendimento.interface';

export interface TecnicoModel {
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
    atendimentos: AtendimentoModel[];
}
