// ---------- MODELOS (retorno da API) ----------
export interface Foto {
  title: string;
  src: string;
}

export interface Categoria {
  id: string;
  name: string;
}

export interface Produto {
  id: string;
  name: string;
  description: string;
  material: string;
  productionTime: string;
  price: number;
  photos: Foto[];
  categoryId: string;
  category: Categoria;
  createdAt: string;
  updatedAt: string;
}

// ---------- ENTRADAS (payload de criação/edição) ----------
export interface FotoInput {
  title: string;
  src: string;
}

export interface ProdutoInput {
  name: string;
  description: string;
  material: string;
  productionTime: string;
  price: string;
  photos: FotoInput[];
  categoryId: string;
}

export interface CategoriaInput {
  name: string;
}
