import { TecnicoModel } from './../tecnico/tecnico.interface';

export interface AtendimentoModel {
    cnpj_cpf: string;
    razao_social: string;
    email: string;
    telefone: string;
    celular: string;
    observacao: string;
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    ponto_referencia: string;
    data_atendimento: string;
    // tipo_atendimento: string;
    tecnico: TecnicoModel[];
    descricao_atendimento: string;
    createdAt: string;
    updatedAt: string;
}
