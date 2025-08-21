"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card border-0 shadow-lg overflow-hidden">
            <div className="row g-0">
              {/* Lado esquerdo: imagem */}
              <div className="col-md-5 d-flex align-items-center justify-content-center bg-light p-4">
                <div className="text-center">
                  <Image
                    src="/about.jpeg"
                    alt="Logo Crochê da T"
                    width={250}
                    height={250}
                    className="rounded-circle border border-3 border-danger-subtle shadow-sm"
                  />
                  <h2 className="mt-4 fw-bold text-danger">Crochê da T</h2>
                  <p className="text-muted fst-italic">Ponto a ponto, feito com dedicação <i className="bi bi-heart-fill text-danger"></i></p>
                </div>
              </div>

              {/* Lado direito: texto */}
              <div className="col-md-7 bg-danger-subtle p-5">
                <h1 className="mb-4 text-center fw-bold text-dark">Sobre a Loja</h1>

                <p className="mb-3 fs-5">
                  Oii, gente! Eu sou a <strong>T</strong>, do <strong>Crochê da T</strong> haha, sim, esse nome mesmo.
                </p>
                <p className="mb-3 fs-5">
                  Aqui vocês acompanham nosso <strong>catálogo de inspirações para o final do ano</strong>. Chega de
                  quebrar a cabeça atrás daquele look perfeito ou do sousplat que vai fazer a mesa brilhar!
                </p>
                <p className="mb-3 fs-5">
                  A loja é <strong>100% artesanal</strong> e, quase sempre, sou só eu na produção. Por isso, agradeço de
                  coração pela paciência com os prazos, cada peça leva tempo porque leva cuidado.
                </p>

                {/* Avisos importantes adaptados */}
                <p className="mb-3 fs-5">
                  <strong className="text-danger"><i className="bi bi-stars text-warning"></i> Avisos Importantes - Crochê da T <i className="bi bi-heart-fill"></i></strong>
                </p>
                <p className="mb-3 fs-5">
                  Para garantir sua encomenda, solicito <strong>50% de entrada</strong> no ato do pedido. O restante é pago
                  na finalização da peça.
                </p>
                <p className="mb-3 fs-5">
                  Os prazos variam de <strong>7 a 30 dias úteis</strong>, de acordo com o tamanho e quantidade. Encomende
                  com antecedência para não correr riscos.
                </p>
                <p className="mb-3 fs-5">
                  Disponibilizo <strong>retirada no local</strong> ou <strong>entrega</strong> (taxa por conta do cliente).
                </p>
                <p className="mb-4 fs-5">
                  Teve uma ideia incrível que não tá no catálogo? Me chama nas redes sociais e conta tudinho! 
                  Quanto mais detalhes, mais fácil transformar seu sonho em crochê.
                </p>


                <p className="mb-4 fs-5">
                  Me segue nas redes sociais, vai que o seu pedido vira destaque nos stories?😄
                </p>

                <div className="d-flex justify-content-center gap-4">
                  <a
                    href="https://www.instagram.com/croche.dat?igsh=bnlwNWc2OTl4bDBj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-warning d-flex align-items-center gap-2"
                  >
                    <i className="bi bi-instagram"></i> @croche.dat
                  </a>

                  <a
                    href="https://www.tiktok.com/@croche.dat?_t=ZM-8yRoTpF2qtZ&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-dark d-flex align-items-center gap-2"
                  >
                    <i className="bi bi-tiktok"></i> @croche.dat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
