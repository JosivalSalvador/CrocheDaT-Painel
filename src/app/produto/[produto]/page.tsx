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
        {/* Cabeçalho */}
        <h1 className="fw-bold mb-2">{produto.name}</h1>
        <h3 className="text-success mb-5">R$ {produto.price}</h3>

        <div className="row g-5">
          {/* Fotos */}
          <div className="col-md-5">
            <div className="card bg-secondary border-0 shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold text-uppercase mb-3">Imagens</h5>
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
                        <p className="small text-muted mt-1 mb-0 text-center">
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
            <div className="card bg-secondary border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold text-uppercase mb-3">Informações Gerais</h5>
                <dl className="row mb-4">
                  <dt className="col-sm-4 text-muted fw-semibold">ID</dt>
                  <dd className="col-sm-8">{produto.id}</dd>

                  <dt className="col-sm-4 text-muted fw-semibold">Descrição</dt>
                  <dd className="col-sm-8">
                    {(produto.description || "")
                      .replace(/\[[^\]]*\]/g, "")
                      .trim() || "Sem descrição"}
                  </dd>

                  <dt className="col-sm-4 text-muted fw-semibold">Observações</dt>
                  <dd className="col-sm-8">
                    {(
                      (produto.description || "").match(/\[([^\]]*)\]/g) || []
                    )
                      .map((obs) => obs.replace(/[\[\]]/g, "").trim())
                      .join(". ") || "Sem observações"}
                  </dd>
                </dl>

                <h5 className="fw-bold text-uppercase mb-3">Características</h5>
                <dl className="row mb-4">
                  <dt className="col-sm-4 text-muted fw-semibold">Material</dt>
                  <dd className="col-sm-8">{produto.material || "-"}</dd>

                  <dt className="col-sm-4 text-muted fw-semibold">Tempo Produção</dt>
                  <dd className="col-sm-8">
                    {produto.productionTime || "-"}
                  </dd>

                  <dt className="col-sm-4 text-muted fw-semibold">Categoria</dt>
                  <dd className="col-sm-8">
                    {produto.category?.name || "Sem categoria"}
                  </dd>

                </dl>

                <h5 className="fw-bold text-uppercase mb-3">Histórico</h5>
                <dl className="row">
                  <dt className="col-sm-4 text-muted fw-semibold">Criado em</dt>
                  <dd className="col-sm-8">
                    {new Date(produto.createdAt).toLocaleString()}
                  </dd>

                  <dt className="col-sm-4 text-muted fw-semibold">Atualizado em</dt>
                  <dd className="col-sm-8">
                    {new Date(produto.updatedAt).toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
