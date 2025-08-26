"use client";

import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";
import { useRouter } from "next/navigation";
import { useProdutosContext } from "./components/produtosProvider/produtosProvider";

export default function App() {
  const router = useRouter();
  const { produtos } = useProdutosContext();

  // Totais
  const totalProdutos = produtos.length;
  const categoriasUnicas = Array.from(
    new Set(produtos.map((p) => p.category?.name))
  );
  const totalCategorias = categoriasUnicas.length;

  // Quantidade por categoria
  const produtosPorCategoria = categoriasUnicas.map((cat) => ({
    categoria: cat || "Sem categoria",
    qtd: produtos.filter((p) => p.category?.name === cat).length,
  }));

  return (
    <main className="bg-dark min-vh-100 py-5 text-light">
      <div className="container">
        {/* TÍTULO DO PAINEL */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <h1 className="h3 fw-bold mb-3 mb-md-0">
            <i className="bi bi-box-seam me-2 text-warning"></i>
            Painel de Produtos
          </h1>
          <button
            className="btn btn-warning fw-semibold shadow-sm"
            onClick={() => router.push("/novo")}
          >
            <i className="bi bi-plus-circle me-1"></i> Adicionar Produto
          </button>
        </div>

        {/* PAINEL ÚNICO DE INFORMAÇÕES */}
        <div className="card bg-secondary text-light shadow-sm border-0 rounded-4 mb-5">
          <div className="card-body">
            <div className="row g-4">
              {/* Total de Produtos */}
              <div className="col-12 col-md-4">
                <div className="card bg-dark text-light shadow-sm border-0 rounded-4 h-100">
                  <div className="card-body d-flex flex-column justify-content-center text-center">
                    <i className="bi bi-box-seam text-warning fs-2 mb-2"></i>
                    <h6 className="text-light mb-1">Total de Produtos</h6>
                    <h3 className="fw-bold mb-0">{totalProdutos}</h3>
                  </div>
                </div>
              </div>

              {/* Total de Categorias */}
              <div className="col-12 col-md-4">
                <div className="card bg-dark text-light shadow-sm border-0 rounded-4 h-100">
                  <div className="card-body d-flex flex-column justify-content-center text-center">
                    <i className="bi bi-tags-fill text-info fs-2 mb-2"></i>
                    <h6 className="text-light mb-1">Total de Categorias</h6>
                    <h3 className="fw-bold mb-0">{totalCategorias}</h3>
                  </div>
                </div>
              </div>

              {/* Produtos por Categoria */}
              <div className="col-12 col-md-4">
                <div className="card bg-dark text-light shadow-sm border-0 rounded-4 h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <i className="bi bi-diagram-3-fill text-success fs-4 me-2"></i>
                      <h6 className="mb-0">Produtos por Categoria</h6>
                    </div>
                    <ul className="list-group list-group-flush">
                      {produtosPorCategoria.map((item) => (
                        <li
                          key={item.categoria}
                          className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light border-0 px-0"
                        >
                          {item.categoria}
                          <span className="badge bg-success rounded-pill">
                            {item.qtd}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LISTAGEM DE PRODUTOS */}
        <div className="card bg-dark text-light shadow-sm border-0 rounded-4">
          <div className="card-body">
            <ListagemProdutos />
          </div>
        </div>
      </div>
    </main>
  );
}
