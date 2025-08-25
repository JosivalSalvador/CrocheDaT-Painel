"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../authProvider/authProvider";

export default function Navbar() {
  const { isAuthenticated, handleLogout, user } = useAuth();
  const router = useRouter();

  const onLogout = async () => {
    try {
      await handleLogout();
      router.push("/");
    } catch (err) {
      console.error("Erro no logout:", err);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-md sticky-top"
      style={{ background: "rgba(33,37,41,0.9)", backdropFilter: "blur(10px)" }}
    >
      <div className="container-fluid">
        {/* Logo / Marca */}
        <button
          onClick={() => router.push("/")}
          className="navbar-brand d-flex align-items-center gap-2 me-auto bg-transparent border-0 p-0"
          style={{ cursor: "pointer" }}
        >
          <Image
            src="/icone.png"
            alt="Ícone"
            width={32}
            height={32}
            className="align-middle"
            priority
          />
          <span className="fs-4 fw-bold text-light fst-italic">Crochê da T</span>
        </button>

        {/* Área à direita */}
        <div className="d-flex align-items-center gap-3">
          {isAuthenticated && user && (
            <span className="text-light fw-semibold">Olá, {user}</span>
          )}

          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold nav-btn"
            >
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="btn btn-warning rounded-pill px-4 py-2 fw-semibold nav-btn"
            >
              <i className="bi bi-box-arrow-in-right me-1"></i> Login
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        nav {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }
        .nav-btn {
          transition: all 0.3s ease;
        }
        .nav-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </nav>
  );
}
