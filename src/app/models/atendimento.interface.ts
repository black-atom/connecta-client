export interface Atendimento {
    _id: string;
    cliente: Cliente;
    endereco: EnderecoAtendimento;
    contato: ContatoAtendimento;
    tecnico: TecnicoAtendimento;
    avaliacao: Avaliacao[];
    imagens: Imagens[];
    data_atendimento: Date;
    estacionamento: string;
    modelo_equipamento: string;
    numero_equipamento: string;
    tipo: string;
    descricao: string;
    testes_efetuados: string;
    observacao: string;
    valor: string;
    autorizado: string;
    criado_por: string;
    criado_em: string;
    atualizado_em: string;
    atualizado_por: string;
    situacao?: Situacao;
    fim: string;
    inicio: string;
    km_inicio: Quilometragem;
    km_final: Quilometragem;
    estado: string;
    finalizado: number;
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
    _id: string;
    nome: string;
}

interface Avaliacao {
    resposta: string;
    nota: number;
    observacao: string;
}

interface Situacao {
    status: string;
    motivo: string;
}

interface Imagens {
  tipo: string;
  url: string;
}

interface Quilometragem {
    km: string;
    data: string;
}
