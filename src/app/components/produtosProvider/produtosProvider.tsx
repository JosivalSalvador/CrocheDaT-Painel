"use client";

import { useQuery } from "@tanstack/react-query"; 
import { getListaProduto } from "../../services/produtos";
import { createContext, useContext, ReactNode } from "react";

type ProdutosContextType = {
  produtos: Produto[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

const ProdutosContext = createContext<ProdutosContextType>({
  produtos: [],
  isLoading: false,
  isError: false,
  refetch: () => {},
});

export function ProdutosProvider({ children }: { children: ReactNode }) {
  const {
    data: produtos = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["listaProdutos"],
    queryFn: getListaProduto,
  });

  return (
    <ProdutosContext.Provider
      value={{
        produtos,
        isLoading,
        isError,
        refetch,
      }}
    >
      {children}
    </ProdutosContext.Provider>
  );
}

export function useProdutosContext() {
  return useContext(ProdutosContext);
}
