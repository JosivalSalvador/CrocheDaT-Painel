"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Produto } from "../../types/produto";
import { deleteProduto } from "../../services/produtos";

interface CardProdutoProps {
  produto: Produto;
  mostrarImagem?: boolean;
}

interface ConfirmDeleteModalProps {
  open: boolean;
  productName: string;
  onConfirm: () => void;
  onClose: () => void;
}

function ConfirmDeleteModal({
  open,
  productName,
  onConfirm,
  onClose,
}: ConfirmDeleteModalProps) {
  // Evita render no SSR e bloqueia scroll do body quando aberto
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const backdropStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1055, // acima de quase tudo (compatível com Bootstrap)
    padding: "1rem",
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "0.75rem",
    width: "min(90vw, 480px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
  };

  const headerStyle: React.CSSProperties = {
    padding: "1rem 1rem",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const bodyStyle: React.CSSProperties = {
    padding: "1rem",
  };

  const footerStyle: React.CSSProperties = {
    padding: "0.75rem 1rem",
    borderTop: "1px solid rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
  };

  return createPortal(
    <div
      style={backdropStyle}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
      onClick={onClose} // clique fora fecha
    >
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h5 id="confirm-delete-title" className="m-0">
            Confirmar exclusão
          </h5>
          <button
            type="button"
            aria-label="Fechar"
            className="btn-close"
            onClick={onClose}
          />
        </div>
        <div style={bodyStyle}>
          <p className="m-0">
            Tem certeza que deseja excluir <b>{productName}</b>?
          </p>
        </div>
        <div style={footerStyle}>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function CardProduto({
  produto,
  mostrarImagem = true,
}: CardProdutoProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false); // evita portal no SSR

  useEffect(() => {
    setMounted(true);
  }, []);

  const verDetalhesProduto = (id: string) => {
    router.push(`/produto/${id}`);
  };

  const editarProduto = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const confirmarDelete = async () => {
    try {
      await deleteProduto(produto.id);
      setShowModal(false);
      router.refresh(); // atualiza a página
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  return (
    <div className="col">
      <div className="card h-100 border-1 shadow-sm rounded-3 overflow-hidden">
        {mostrarImagem && (produto.photos?.length ?? 0) > 0 && (
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5",
              cursor: "pointer",
            }}
            onClick={() => verDetalhesProduto(produto.id)}
          >
            <Image
              src={produto.photos[0].src}
              alt={produto.photos[0].title}
              fill
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={false}
            />
          </div>
        )}

        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5
              className="card-title fw-semibold text-truncate"
              title={produto.name}
            >
              {produto.name}
            </h5>
            <h6 className="text-success fw-bold mb-3">R$ {produto.price}</h6>
          </div>

          <div className="d-flex gap-2 mt-2">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => editarProduto(produto.id)}
            >
              Editar
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => setShowModal(true)}
            >
              Excluir
            </button>
          </div>
        </div>
      </div>

      {/* Modal em Portal, centralizado e full-screen */}
      {mounted && (
        <ConfirmDeleteModal
          open={showModal}
          productName={produto.name}
          onConfirm={confirmarDelete}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
