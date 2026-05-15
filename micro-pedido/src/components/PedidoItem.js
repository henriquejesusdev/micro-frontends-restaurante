import React from "react";

export default function PedidoItem({ item, onDiminuir, onRemover }) {
  const subtotal = (item.preco || 0) * item.quantidade;
  const subtotalFormatado = subtotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  return (
    <article className="pedido-item">
      <div>
        <div className="pedido-item-topo">
          <h3>{item.nome}</h3>
          <span className="quantidade-item">x{item.quantidade}</span>
        </div>

        <p>{item.descricao}</p>
        <strong className="pedido-preco">{subtotalFormatado}</strong>
      </div>

      <div className="pedido-acoes">
        <button type="button" className="btn-diminuir" onClick={onDiminuir}>
          -1
        </button>
        <button type="button" className="btn-remover" onClick={onRemover}>
          Remover
        </button>
      </div>
    </article>
  );
}
