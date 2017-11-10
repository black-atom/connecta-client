import { Contato, Endereco, IdentificacaoCliente, HistoricoUsuario } from './utils';

export interface Atendimento {
    _id: string;
    cliente: IdentificacaoCliente;
    endereco: Endereco;
    contato: Contato;
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
    situacao?: Situacao;
    fim: string;
    inicio: string;
    km_inicio: Quilometragem;
    km_final: Quilometragem;
    estado: string;
    finalizado: number;
    HistoricoUsuario;

}

interface TecnicoAtendimento {
    _id: string;
    nome: string;
}

interface Avaliacao {
    resposta: string;
    nota: number;
    observacao: string;
    media: number;
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
