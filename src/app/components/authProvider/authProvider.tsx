"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { logout } from "@/app/services/auth"; // 👈 só mantemos logout se quiser avisar o backend

type AuthContextType = {
  user: string | null;
  isAuthenticated: boolean;
  setUser: (value: string | null) => void;
  handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recupera direto do sessionStorage
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (username: string) => {
    setUser(username);
    setIsAuthenticated(true);
    sessionStorage.setItem("user", username);
  };

  const handleLogout = async () => {
    try {
      await logout(); // se não quiser chamar backend, pode remover
    } catch (err) {
      console.error("Erro ao sair:", err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, handleLogout }}>
      {!loading && children} {/* evita flash de "não logado" */}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return ctx;
}
