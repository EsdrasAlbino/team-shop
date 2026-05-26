"use client";

import React, { useState } from "react";

type ProductShape = {
  id: string;
  titulo: string;
  preco: number;
  imagem_url: string[];
  descricao: string;
  opcoes: {
    tamanhos: string[];
    cores?: string[];
  };
  disponivel: boolean;
};

export default function ProductActions({ product }: { product: ProductShape }) {
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  function formatPrice(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  function buildWhatsAppLink() {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5581989114268";

    const messageLines = [
      `Olá! Quero a peça ${product.titulo}, ${quantity} unidade(s), tamanho ${size ?? "a definir"}.`,
    ].filter(Boolean) as string[];

    return `https://wa.me/${number}?text=${encodeURIComponent(messageLines.join("\n"))}`;
  }

  function handleBuyClick(e: React.MouseEvent) {
    if (!product.disponivel) return;
    // Se tamanho é obrigatório, garantir seleção
    if (product.opcoes.tamanhos.length > 0 && !size) {
      e.preventDefault();
      const el = document.getElementById("size-selection");
      el?.focus();
      return;
    }

    const href = buildWhatsAppLink();
    window.open(href, "_blank");
  }

  return (
    <div>
      <div className="option-group">
        <span className="option-label">Tamanhos</span>
        <div id="size-selection" className="chips" role="list">
          {product.opcoes.tamanhos.map((t) => {
            const selected = t === size;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={selected}
                onClick={() => setSize(t)}
                className={`chip ${selected ? "chip--selected" : ""}`}
                style={{ cursor: "pointer" }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="option-group">
        <span className="option-label">Quantidade</span>
        <input
          aria-label="Quantidade"
          className="chip"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))}
          style={{ width: 96 }}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <button
          className="cta"
          onClick={handleBuyClick}
          aria-disabled={!product.disponivel}
        >
          Comprar no WhatsApp
        </button>
      </div>
    </div>
  );
}
