import { useCarrinhoContext } from "../carrinhoProvider/carrinhoProvider";

export default function ResumoCarrinho() {
  const { carrinho, valorTotalCarrinho } = useCarrinhoContext();

  if (carrinho.length === 0) return null;

  const quantidadeTotal = carrinho.reduce(
    (acc, item) => acc + item.quantidade,
    0
  );

  return (
    <div className="d-flex flex-column gap-1">
      <small className="text-muted">
        Itens no carrinho: <strong>{quantidadeTotal}</strong>
      </small>
      <small className="text-muted">
        Valor total: <strong>R$ {valorTotalCarrinho()}</strong>
      </small>
    </div>
  );
}
