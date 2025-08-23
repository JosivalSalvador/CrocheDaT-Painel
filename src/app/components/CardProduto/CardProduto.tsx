import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Produto } from "../../types/produto";
import { deleteProduto } from "../../services/produtos";

interface CardProdutoProps {
  produto: Produto;
  mostrarImagem?: boolean;
}

export default function CardProduto({
  produto,
  mostrarImagem = true,
}: CardProdutoProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

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
        {mostrarImagem && produto.photos.length > 0 && (
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

      {/* Modal global */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar exclusão</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body">
                <p>
                  Tem certeza que deseja excluir <b>{produto.name}</b>?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-danger" onClick={confirmarDelete}>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
