"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getSession, logout } from "@/app/services/auth";

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

  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await getSession();
        setIsAuthenticated(data.authenticated);
        setUser(data.authenticated ? data.user : null);
      } catch (err) {
        console.error("Erro ao verificar sessão:", err);
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (err) {
      console.error("Erro ao sair:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return ctx;
}
