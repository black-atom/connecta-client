export interface Atendimento {
    _id: number;
    cnpj_cpf: string;
    razao_social: string;
    nome_fantasia?: string;
    inscricao_estadual: string;
    contato: ContatoAtendimento;
    endereco: EnderecoAtendimento;
    estacionamento: string;
    modelo_equipamento: string;
    numero_equipamento: string;
    data_atendimento: string;
    tipo: string;
    descricao: string;
    testes_efetuados: string;
    observacao: string;
    criado_por: string;
    criado_em: string;
    atualizado_em: string;
    atualizado_por: string;
}

interface EnderecoAtendimento {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
    ponto_referencia: string;
    complemento: string;
}

interface ContatoAtendimento {
    nome: string;
    email: string;
    telefone: string;
    celular: string;
    observacao: string;
}

