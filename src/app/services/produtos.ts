import { produtosApi } from ".";
import { ProdutoInput, Produto } from '../types/produto';

export async function getListaProduto(): Promise<Produto[]> {
  return produtosApi.get("/products").then((res) => res.data);
}

export async function getProduto(id: string): Promise<Produto> {
  return produtosApi.get(`/products/${id}`).then((res) => res.data);
}

export async function createProduto(produto: ProdutoInput): Promise<Produto> {
  return produtosApi.post("/products", produto).then((res) => res.data);
}

export async function updateProduto(id: string, produto: ProdutoInput): Promise<Produto> {
  return produtosApi.put(`/products/${id}`, produto).then((res) => res.data);
}

export async function deleteProduto(id: string): Promise<void> {
  return produtosApi.delete(`/products/${id}`).then(() => {});
}