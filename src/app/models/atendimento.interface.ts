export interface Atendimento {
    cliente: Cliente;
    endereco: EnderecoAtendimento;
    contato: ContatoAtendimento;
    tecnico: TecnicoAtendimento;
    avaliacao: Avaliacao;
    imagens: string[];
    data_atendimento: string;
    estacionamento: string;
    modelo_equipamento: string;
    numero_equipamento: string;
    tipo: string;
    descricao: string;
    testes_efetuados: string;
    observacao: string;
    valor: string;
    criado_por: string;
    criado_em: string;
    atualizado_em: string;
    atualizado_por: string;
}

interface Cliente {
    _id: number;
    cnpj_cpf: string;
    nome_razao_social: string;
    nome_fantasia?: string;
    inscricao_estadual?: string;
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

interface TecnicoAtendimento {
    _id: number;
    nome: string;
}

interface Avaliacao {
    resposta: string;
    nota: number;
    observacao: string;
}
