import Image from "next/image";
import { useRouter } from "next/navigation";

interface CardProdutoProps {
  produto: Produto;
  mostrarImagem?: boolean;
  mostrarBotao?: boolean;
}

export default function CardProduto({
  produto,
  mostrarImagem = true,
}: CardProdutoProps) {
  const router = useRouter();

  const verDetalhesProduto = (id: string) => {
    router.push(`/produto/${id}`);
  };

  return (
    <div className="col">
      <div className="card h-100 border-1 shadow-sm rounded-3 overflow-hidden">
        {mostrarImagem && produto.photos.length > 0 && (
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5", // de 4/3 para 1:1 (quadrado, imagem maior)
              cursor: "pointer",
            }}
            onClick={() => verDetalhesProduto(produto.id)}
          >
            <Image
              src={produto.photos[0].src}
              alt={produto.photos[0].titulo}
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
            <h6 className="text-success fw-bold mb-3">
              R$ {produto.price}
            </h6>
          </div>

        </div>
      </div>
    </div>
  );
}
