"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getProduto } from "@/app/services/produtos"; // ajuste o path
import { Produto } from "@/app/types/produto";

export default function ProdutoDetalhe() {
  const params = useParams();
  const produtoId = params?.produto as string;

  const [produto, setProduto] = useState<Produto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!produtoId) return;

    setIsLoading(true);
    getProduto(produtoId)
      .then((data) => {
        setProduto(data);
        setIsError(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [produtoId]);

  if (isLoading) {
    return (
      <div className="container py-5 text-center text-light">
        <div className="spinner-border text-light" role="status" />
        <p className="mt-3">Carregando produto...</p>
      </div>
    );
  }

  if (isError || !produto) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          Erro ao carregar o produto.
        </div>
      </div>
    );
  }

  return (
    <main className="bg-dark min-vh-100 py-5 text-light">
      <div className="container">
        <h1 className="fw-bold mb-4">{produto.name}</h1>

        <div className="row g-4">
          {/* Fotos */}
          <div className="col-md-5">
            <div className="card bg-secondary text-light border-0 shadow-sm">
              <div className="card-body">
                {produto.photos.length > 0 ? (
                  <div className="row g-2">
                    {produto.photos.map((foto, index) => (
                      <div className="col-6" key={index}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            aspectRatio: "2 / 3",
                            borderRadius: "0.375rem",
                            border: "1px solid #444",
                            overflow: "hidden",
                          }}
                        >
                          <Image
                            src={foto.src}
                            alt={foto.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <p className="small text-muted mt-1 mb-0">
                          {foto.title}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">Sem imagens cadastradas</p>
                )}
              </div>
            </div>
          </div>

          {/* Detalhes técnicos */}
          <div className="col-md-7">
            <div className="card bg-secondary text-light border-0 shadow-sm h-100">
              <div className="card-body">
                <h4 className="text-success mb-4">R$ {produto.price}</h4>

                <div className="row mb-3">
                  <div className="col-sm-4 fw-semibold">ID</div>
                  <div className="col-sm-8">{produto.id}</div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-4 fw-semibold">Descrição</div>
                  <div className="col-sm-8">
                    {(produto.description || "")
                      .replace(/\[[^\]]*\]/g, "")
                      .trim() || "Sem descrição"}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-4 fw-semibold">Observações</div>
                  <div className="col-sm-8">
                    {(
                      (produto.description || "").match(/\[([^\]]*)\]/g) || []
                    )
                      .map((obs) => obs.replace(/[\[\]]/g, "").trim())
                      .join(". ") || "Sem observações"}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-4 fw-semibold">Material</div>
                  <div className="col-sm-8">{produto.material || "-"}</div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-4 fw-semibold">Tempo Produção</div>
                  <div className="col-sm-8">
                    {produto.productionTime || "-"}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-4 fw-semibold">Categoria</div>
                  <div className="col-sm-8">
                    {produto.category?.name || "Sem categoria"}
                  </div>
                </div>

                <div className="row mt-4 border-top pt-3 text-muted small">
                  <div className="col-sm-6">
                    <strong>Criado em:</strong>{" "}
                    {new Date(produto.createdAt).toLocaleString()}
                  </div>
                  <div className="col-sm-6">
                    <strong>Atualizado em:</strong>{" "}
                    {new Date(produto.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
