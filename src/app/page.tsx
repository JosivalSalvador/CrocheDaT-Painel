"use client";

import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";

export default function App() {
  return (
    <main className="bg-dark min-vh-100 py-5 text-light">
      <div className="container">
        {/* TÍTULO DO PAINEL */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <h1 className="h3 fw-bold mb-3 mb-md-0">
            <i className="bi bi-box-seam me-2 text-warning"></i>
            Painel de Produtos
          </h1>
          <button className="btn btn-warning fw-semibold shadow-sm">
            <i className="bi bi-plus-circle me-1"></i> Adicionar Produto
          </button>
        </div>

        {/* PAINEL DE INFORMAÇÕES */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-md-4">
            <div className="card bg-secondary text-light shadow-sm border-0 rounded-4 h-100">
              <div className="card-body d-flex flex-column align-items-start">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2 fs-4"></i>
                  <h6 className="text-light mb-0">Produtos Ativos</h6>
                </div>
                <h3 className="fw-bold mt-2">128</h3>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card bg-secondary text-light shadow-sm border-0 rounded-4 h-100">
              <div className="card-body d-flex flex-column align-items-start">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-exclamation-triangle-fill text-danger me-2 fs-4"></i>
                  <h6 className="text-light mb-0">Estoque Baixo</h6>
                </div>
                <h3 className="fw-bold mt-2">14</h3>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card bg-secondary text-light shadow-sm border-0 rounded-4 h-100">
              <div className="card-body d-flex flex-column align-items-start">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-tags-fill text-info me-2 fs-4"></i>
                  <h6 className="text-light mb-0">Categorias</h6>
                </div>
                <h3 className="fw-bold mt-2">9</h3>
              </div>
            </div>
          </div>
        </div>

        {/* LISTAGEM DE PRODUTOS */}
        <div className="card bg-secondary text-light shadow-sm border-0 rounded-4">
          <div className="card-body">
            <ListagemProdutos />
          </div>
        </div>
      </div>
    </main>
  );
}
