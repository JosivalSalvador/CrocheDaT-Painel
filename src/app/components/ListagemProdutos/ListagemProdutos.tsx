import CardProduto from "../CardProduto/CardProduto";
import { useProdutosContext } from "../produtosProvider/produtosProvider";

export default function ListagemProdutos() {
  const { produtos, isLoading } = useProdutosContext();

  const produtosPorCategoria = produtos.reduce((acc, produto) => {
    const categoria = produto.category?.name || "Sem categoria";
    if (!acc[categoria]) acc[categoria] = [];
    acc[categoria].push(produto);
    return acc;
  }, {} as Record<string, typeof produtos>);

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-12">
          {isLoading ? (
            <p>Carregando produtos...</p>
          ) : (
            Object.entries(produtosPorCategoria).map(([categoria, lista]) => (
              <div
                key={categoria}
                className="mb-5 p-4 rounded"
                style={{
                  backgroundColor: "#fffdfb",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
                  border: "1px solid #e7cfa3",
                }}
              >
                <h3 className="fw-bold mb-4">{categoria}</h3>

                <div className="row g-3">
                  {lista.map((produto) => (
                    <div
                      key={produto.id}
                      className="col-12 col-sm-6 col-md-4 col-lg-3"
                    >
                      <CardProduto produto={produto} />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
