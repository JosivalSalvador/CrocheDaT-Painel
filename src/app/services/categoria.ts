import { produtosApi } from ".";
import { Categoria } from '../types/produto';

export async function getListaCategoria(): Promise<Categoria[]> {
  return produtosApi.get("/categorias").then((res) => res.data);
}