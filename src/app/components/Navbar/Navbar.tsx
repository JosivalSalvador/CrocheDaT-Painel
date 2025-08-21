"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-md sticky-top"
      style={{ background: "rgba(248,192,208,0.5)", backdropFilter: "blur(10px)" }}
    >
      <div className="container-fluid">
        <a href="/" className="navbar-brand d-flex align-items-center gap-2 me-auto">
          <Image
            src="/icone.png"
            alt="Ícone"
            width={32}
            height={32}
            className="align-middle"
            priority
          />

          <span className="fs-4 fw-bold text-dark fst-italic">Crochê da T</span>
        </a>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Abrir menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
          <ul className="navbar-nav d-flex gap-3 mt-3 mt-md-0 align-items-center">
            {[
              { href: "/", icon: "bi-house-door-fill", label: "Início" },
              { href: "/carrinho", icon: "bi-cart-fill", label: "Carrinho" },
              { href: "/about", icon: "bi-bag-heart", label: "IInformações e Encomendas" },
            ].map((item, i) => (
              <li className="nav-item" key={i}>
                <Link
                  href={item.href}
                  className="btn btn-outline-danger rounded-pill px-4 py-2 fw-semibold nav-btn"
                >
                  <i className={`bi ${item.icon} me-1`}></i> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        nav {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }
        .nav-btn {
          color: #d6336c;
          border: 2px solid #d6336c;
          backdrop-filter: blur(4px);
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.4s ease;
        }
        .nav-btn:hover {
          color: #fff !important;
          background: linear-gradient(135deg, #d6336c, #a61e4d);
          border-color: transparent;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </nav>
  );
}
