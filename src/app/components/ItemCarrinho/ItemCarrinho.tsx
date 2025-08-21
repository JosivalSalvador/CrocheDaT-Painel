import Image from "next/image";
import { useCarrinhoContext } from "../carrinhoProvider/carrinhoProvider";
import { useRouter } from "next/navigation";

interface ItemCarrinhoProps {
  itemCarrinho: Produto & { quantidade: number };
}

export default function ItemCarrinho({ itemCarrinho }: ItemCarrinhoProps) {
  const { removerDoCarrinho, adicionarAoCarrinho, isRemocaoPendente } =
    useCarrinhoContext();

  const { quantidade, ...produto } = itemCarrinho;
  const router = useRouter();

  const verDetalhesProduto = (id: string) => {
    router.push(`/produto/${id}`);
  };

  return (
    <div
      className="d-flex flex-wrap align-items-center w-100"
    >
      {/* Imagem */}
      <div
        className="order-1"
        style={{
          flexShrink: 0,
          cursor: "pointer",
          height: "90px",
          width: "90px",
        }}
        onClick={() => verDetalhesProduto(produto.id)}
      >
        <Image
          className="rounded"
          src={itemCarrinho.photos[0].src}
          alt={itemCarrinho.photos[0].titulo}
          width={90}
          height={90}
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
        />
      </div>

      {/* Info */}
      <div className="flex-grow-1 d-flex flex-column justify-content-between min-w-0 px-2 mb-3 order-2">
        <div>
          <h6 className="mt-3 mb-1 text-truncate">{itemCarrinho.name}</h6>
          <small className="text-muted d-block mb-4 text-truncate">
            {itemCarrinho.category.name}
          </small>
          <small className="fw-bold">
            R$ {itemCarrinho.price} × {quantidade} ={" "}
            R$ {(itemCarrinho.price * quantidade).toFixed(2)}
          </small>
        </div>

      </div>

      {/* Botões → no mobile (order-3) ficam abaixo; no desktop (order-sm-3 ms-sm-auto) vão pra direita */}
      <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0 order-3 order-sm-3 ms-0 ms-sm-auto">
        <button
          onClick={() => removerDoCarrinho(itemCarrinho.id)}
          className="btn btn-outline-danger btn-sm"
          disabled={isRemocaoPendente}
        >
          –
        </button>
        <span className="fw-bold">{quantidade}</span>
        <button
          onClick={() => adicionarAoCarrinho(produto)}
          className="btn btn-outline-info btn-sm"
        >
          +
        </button>
      </div>
    </div>
  );
}
