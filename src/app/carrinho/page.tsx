"use client";

import { useState } from "react";
import ListagemCarrinho from "../components/ListagemCarrinho/ListagemCarrinho";
import { useCarrinhoContext } from "../components/carrinhoProvider/carrinhoProvider";
import { toast } from "react-toastify";

export default function App() {
  const { carrinho, valorTotalCarrinho } = useCarrinhoContext();
  const numeroWhatsApp = "5592984902857";

  const [formaPagamento, setFormaPagamento] = useState("");
  const [showModal, setShowModal] = useState(false);

  const abrirModal = () => {
    if (carrinho.length === 0) {
      toast.warn("Seu carrinho está vazio!");
      return;
    }
    setShowModal(true);
  };

  const enviarWhatsApp = () => {
    if (!formaPagamento) {
      toast.error("Escolha uma forma de pagamento!");
      return;
    }

    const mensagem = carrinho.map(
      (item) =>
        `• ${item.name} (Qtd: ${item.quantidade}) - R$ ${item.price}`
    ).join("\n");

    
    const total = valorTotalCarrinho()
      .toFixed(2)
      .replace('.', ',');

    const textoFinal = `Olá! Gostaria de finalizar o pedido com os seguintes itens:\n\n${mensagem}\n\n*Valor total: R$ ${total}*\nForma de pagamento: ${formaPagamento}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoFinal)}`;
    window.open(url, "_blank");
    setShowModal(false);
    
  };

  return (
    <main>
      <div className="container p-5">
        <ListagemCarrinho />

        {/* Botão mais destacado */}
        <button
          className="btn btn-lg btn-outline-success mt-4 w-100 fw-bold shadow"
          onClick={abrirModal}
        >
          <i className="bi bi-whatsapp me-2"></i>
          Encomendar
        </button>
      </div>

      {/* Modal Bootstrap */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger-subtle">
                <h5 className="modal-title">Confirmar pedido</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Escolha a forma de pagamento e confirme para iniciar a conversa com a vendedora no WhatsApp.</p>
                <select
                  className="form-select"
                  value={formaPagamento}
                  onChange={(e) => setFormaPagamento(e.target.value)}
                >
                  <option value="">Selecione uma forma de pagamento...</option>
                  <option value="Pix">Pix</option>
                  <option value="Cartão de Crédito">Cartão de Crédito (Link de pagamento)</option>
                  <option value="Cartão de Débito">Cartão de Débito (Link de pagamento)</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={enviarWhatsApp}
                >
                  Confirmar e Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
