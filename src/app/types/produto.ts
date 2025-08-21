interface Foto {
  titulo: string;
  src: string;
}

interface Produto {
  id: string;
  name: string;
  description: string;
  material: string;
  productionTime: string;
  price: number;
  photos: Foto[];
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}
