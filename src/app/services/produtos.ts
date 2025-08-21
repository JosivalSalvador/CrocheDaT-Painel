import { produtosApi } from ".";


export async function getListaProduto(): Promise<Produto[]> {
    return await produtosApi.get("/products").then((response)=> response.data)
}

