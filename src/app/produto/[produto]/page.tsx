"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getProduto } from "@/app/services/produtos";
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
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-muted">Carregando produto...</p>
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
    <main className="bg-light py-5">
      <div className="container">
        <h1 className="fw-bold mb-4">Detalhes do Produto</h1>

        <div className="row g-4">
          {/* Fotos */}
          <div className="col-md-5">
            <div className="card border-0 shadow-sm">
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
                            border: "1px solid #dee2e6",
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
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h2 className="fw-semibold">{produto.name}</h2>
                <h4 className="text-success mb-4">R$ {produto.price}</h4>

                <dl className="row">
                  <dt className="col-sm-4">ID</dt>
                  <dd className="col-sm-8">{produto.id}</dd>

                  <dt className="col-sm-4">Descrição</dt>
                  <dd className="col-sm-8">
                    {(produto.description || "")
                      .replace(/\[[^\]]*\]/g, "")
                      .trim() || "Sem descrição"}
                  </dd>

                  <dt className="col-sm-4">Observações</dt>
                  <dd className="col-sm-8">
                    {(
                      (produto.description || "").match(/\[([^\]]*)\]/g) || []
                    )
                      .map((obs) => obs.replace(/[\[\]]/g, "").trim())
                      .join(". ") || "Sem observações"}
                  </dd>

                  <dt className="col-sm-4">Material</dt>
                  <dd className="col-sm-8">{produto.material || "-"}</dd>

                  <dt className="col-sm-4">Tempo de Produção</dt>
                  <dd className="col-sm-8">
                    {produto.productionTime || "-"}
                  </dd>

                  <dt className="col-sm-4">Categoria</dt>
                  <dd className="col-sm-8">
                    {produto.category?.name || "Sem categoria"}
                  </dd>

                  <dt className="col-sm-4">Criado em</dt>
                  <dd className="col-sm-8">
                    {new Date(produto.createdAt).toLocaleString()}
                  </dd>

                  <dt className="col-sm-4">Atualizado em</dt>
                  <dd className="col-sm-8">
                    {new Date(produto.updatedAt).toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Debug opcional: dump do objeto */}
        <div className="card mt-4 border-0 shadow-sm">
          <div className="card-body">
            <h5 className="fw-bold">Raw JSON</h5>
            <pre className="small bg-light p-3 rounded border">
              {JSON.stringify(produto, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
