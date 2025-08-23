"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { logout } from "@/app/services/auth";

export default function Navbar({ isAuthenticated }: { isAuthenticated: boolean }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (err) {
      console.error("Erro ao sair:", err);
    }
  };

  return (
    <nav className="navbar navbar-expand-md sticky-top"
      style={{ background: "rgba(33,37,41,0.9)", backdropFilter: "blur(10px)" }}>
      <div className="container-fluid">
        <a href="/" className="navbar-brand d-flex align-items-center gap-2 me-auto">
          <Image src="/icone.png" alt="Ícone" width={32} height={32} priority />
          <span className="fs-4 fw-bold text-light fst-italic">Crochê da T</span>
        </a>

        <div className="d-flex">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold nav-btn">
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          ) : (
            <button onClick={() => router.push("/login")} className="btn btn-warning rounded-pill px-4 py-2 fw-semibold nav-btn">
              <i className="bi bi-box-arrow-in-right me-1"></i> Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
