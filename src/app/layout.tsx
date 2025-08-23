import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./components/BootstrapClient";
import "react-toastify/dist/ReactToastify.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import { ReactQueryClientProvider } from './components/ReactQueryClient/ReactQueryClient';
import { ProdutosProvider } from './components/produtosProvider/produtosProvider';

export const metadata: Metadata = {
  title: "Crochê da T",
  icons: [
    { url: "/icone.png", sizes: "32x32", type: "image/png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-dark">
        <ReactQueryClientProvider>
            <ProdutosProvider>
                <Navbar />
                {children}
                <BootstrapClient />
                <ToastContainer />
            </ProdutosProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
