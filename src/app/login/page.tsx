"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../services/auth";
import { useAuth } from "../components/authProvider/authProvider";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const router = useRouter();
  const { setUser } = useAuth(); // 👈 vai gravar direto no contexto

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      // 1. Faz login no backend (valida credenciais / cria cookie de sessão)
      await login(username, password);

      // 2. Não precisa chamar getSession, já temos o username
      setUser(username);

      // 3. Redireciona
      router.push("/");
    } catch (err) {
      setErro("Credenciais inválidas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="d-flex align-items-center justify-content-center bg-dark min-vh-100">
      <div
        className="card bg-secondary text-light shadow-lg border-0 rounded-4 p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="card-body">
          <h2 className="fw-bold mb-4 text-center">
            <i className="bi bi-box-arrow-in-right text-warning me-2"></i>
            Login
          </h2>

          {erro && <div className="alert alert-danger py-2">{erro}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="name"
                className="form-control bg-dark text-light border-0"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="senha" className="form-label">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                className="form-control bg-dark text-light border-0"
                value={password}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-warning w-100 fw-semibold shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <span>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Entrando...
                </span>
              ) : (
                <>
                  <i className="bi bi-door-open-fill me-1"></i> Entrar
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
