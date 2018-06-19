export interface Produto {
  _id: string;
  categoria: string;
  descricao: string;
  marca: string;
  modelo: string;
  imagemURL: string;
  valor: number;
  pecas: Peca[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export interface Peca {
  descricao: string;
  valor: number;
  _id: string;
}

export interface ResponseProdutos {
  produtos: Produto[];
  count: number;
}
