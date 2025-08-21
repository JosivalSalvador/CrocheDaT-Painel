import ItemCarrinho from "../ItemCarrinho/ItemCarrinho";
import { useCarrinhoContext } from "../carrinhoProvider/carrinhoProvider";
import ResumoCarrinho from "../resumoCarrinho/resumoCarrinho";

export default function ListagemCarrinho() {
  const { carrinho } = useCarrinhoContext();

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4 fw-bold">Seu carrinho</h5>

        {carrinho.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {carrinho.map((item) => (
              <div key={item.id} className="card shadow-sm pt-1 pb-2 pe-3 ps-3">
                <ItemCarrinho itemCarrinho={item} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">Seu carrinho está vazio.</p>
        )}
      </div>

      {carrinho.length > 0 && (
        <div className="card-footer">
          <ResumoCarrinho />
        </div>
      )}
    </div>
  );
}
