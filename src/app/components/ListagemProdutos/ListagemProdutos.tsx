import CardProduto from "../CardProduto/CardProduto";
import { useProdutosContext } from "../produtosProvider/produtosProvider";
import { useRef } from "react";

export default function ListagemProdutos() {
  const { produtos, isLoading } = useProdutosContext();

  const produtosPorCategoria = produtos.reduce((acc, produto) => {
    const categoria = produto.category?.name || "Sem categoria";
    if (!acc[categoria]) acc[categoria] = [];
    acc[categoria].push(produto);
    return acc;
  }, {} as Record<string, typeof produtos>);

  const scrollRefs = useRef<Record<string, HTMLDivElement>>({});

  const scroll = (categoria: string, direction: "left" | "right") => {
    const ref = scrollRefs.current[categoria];
    if (!ref) return;
    const scrollAmount = ref.offsetWidth * 0.8;
    ref.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-12">
          {isLoading ? (
            <>
              {[...Array(2)].map((_, idx) => (
                <div key={idx} className="mb-4">
                  <h3 className="fw-bold placeholder-glow">
                    <span className="placeholder col-4"></span>
                  </h3>
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="col">
                        <div className="card placeholder-glow">
                          <div className="card-img-top placeholder" style={{ aspectRatio: "4/3" }}></div>
                          <div className="card-body">
                            <h5 className="card-title placeholder col-6"></h5>
                            <p className="card-text placeholder col-8"></p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            Object.entries(produtosPorCategoria).map(([categoria, lista]) => (
              <div
                key={categoria}
                className="mb-4 p-4 bg-dark rounded"
                style={{
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
                  border: "1px solid #e7cfa3",
                }}
              >
                <h3 className="fw-bold mb-3">{categoria}</h3>

                <div style={{ position: "relative" }}>
                  {/* Botão Esquerda */}
                  <button
                    onClick={() => scroll(categoria, "left")}
                    className="btn btn-light"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "-18px",
                      transform: "translateY(-50%)",
                      zIndex: 1,
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>

                  {/* Carrossel */}
                  <div
                    ref={(el) => {
                      if (el) scrollRefs.current[categoria] = el;
                    }}
                    className="d-flex px-2 py-3"
                    style={{
                      overflowX: "auto",
                      overflowY: "hidden",
                      scrollBehavior: "smooth",
                      WebkitOverflowScrolling: "touch",
                      gap: "1rem",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    {lista.map((produto) => (
                      <div
                        key={produto.id}
                        className="bg-white shadow-sm rounded border flex-shrink-0"
                        style={{
                          flex: "0 0 auto",
                          width: "clamp(180px, 40vw, 240px)", // largura fluida entre 180px e 240px
                          transition: "transform 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.02)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        <CardProduto produto={produto} />
                      </div>
                    ))}
                  </div>

                  {/* Botão Direita */}
                  <button
                    onClick={() => scroll(categoria, "right")}
                    className="btn btn-light"
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-18px",
                      transform: "translateY(-50%)",
                      zIndex: 1,
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
