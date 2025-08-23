"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logout, getSession } from "@/app/services/auth";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await getSession();
        setIsAuthenticated(data.authenticated);
      } catch (err) {
        console.error("Erro ao verificar sessão:", err);
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      router.push("/");
    } catch (err) {
      console.error("Erro ao sair:", err);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-md sticky-top"
      style={{ background: "rgba(33,37,41,0.9)", backdropFilter: "blur(10px)" }}
    >
      <div className="container-fluid">
        {/* Logo / Marca */}
        <a href="/" className="navbar-brand d-flex align-items-center gap-2 me-auto">
          <Image
            src="/icone.png"
            alt="Ícone"
            width={32}
            height={32}
            className="align-middle"
            priority
          />
          <span className="fs-4 fw-bold text-light fst-italic">Crochê da T</span>
        </a>

        {/* Botão Login / Logout */}
        <div className="d-flex">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
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
