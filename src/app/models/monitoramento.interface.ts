export interface Monitoramento {
    _id: string;
    km_inicial: number;
    km_final: number;
    data_hora_inicial_km: Date;
    data_hora_final_km: Date;
    data_hora_inicial_virgente_local: Date;
    data_hora_final_virgente_local: Date;
    tipo: string;
    id_funcionario: string;
    id_atendimento: string;
    duracao_evento?: string;
    tempo_deslocamento?: string;
    total_km_deslocamento?: number;
    nome_razao_social?: string;
    cnpj_cpf?: string;
}
