export interface Produto {
  _id: string;
  category: string;
  description: string;
  brand: string;
  serialControl: boolean;
  buyPrice: number;
  sellPrice: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  productCode: string;
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
