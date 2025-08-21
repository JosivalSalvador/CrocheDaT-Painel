"use client";

import ListagemProdutos from "./components/ListagemProdutos/ListagemProdutos";

export default function App() {
  return (
    <main className="bg-light">

      {/* HERO FULLSCREEN (Mantendo seu texto original) */}
      <section
        className="d-flex align-items-center justify-content-center text-center position-relative mb-5 px-3"
        style={{
          minHeight: "47vh", // melhor que 50vh em mobile
          backgroundImage: "linear-gradient(135deg, #fbe6d4, #fdebd2, #f8d9c4)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#3e3e3e",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.05), rgba(255, 215, 0, 0.15))",
          }}
        ></div>
        <div className="position-relative z-1 container py-4">
          <h1 className="fw-bold mb-3 fs-1 fs-md-1 fs-lg-display-4">
            <i className="bi bi-stars me-2" style={{ color: "#FFD700" }}></i>
            Crochê para brilhar nas festas de fim de ano
          </h1>
          <p className="lead mb-0 fs-6 fs-md-5">
            Amigo secreto, ceia em família ou virada do ano, nossas peças artesanais
            são o presente perfeito e o toque final no seu visual.
          </p>
        </div>
      </section>


      {/* PRODUTOS EM DESTAQUE (EXATAMENTE como seu código original) */}
      <section id="produtos" className="py-5 bg-light border-top border-3 border-warning-subtle shadow-sm">
        <div className="container">
          <div className="mb-5 text-center text-md-start">
            <h2 className="display-6 fw-bold mb-3">
              <span className="px-4 py-2 rounded-pill bg-warning-subtle text-dark shadow-sm">
                <i className="bi bi-stars me-2" style={{ color: "#FFD700" }}></i>
                Produtos em destaque para as festas
              </span>
            </h2>
          </div>
          <div className="mt-5">
            <ListagemProdutos />
          </div>
        </div>
      </section>

    </main>
  );
}
