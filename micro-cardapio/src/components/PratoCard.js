import React from "react";

export default function PratoCard({ prato, onAdicionar }) {
  const precoFormatado = prato.preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  return (
    <article className="prato-card">
      <img
        src={prato.imagem}
        alt={prato.nome}
        className="imagem-prato"
      />

      <div className="prato-conteudo">
        <div className="prato-topo">
          <h3>{prato.nome}</h3>
          <strong>{precoFormatado}</strong>
        </div>

        <p>{prato.descricao}</p>
      </div>

      <button onClick={() => onAdicionar(prato)}>
        Adicionar ao pedido
      </button>
    </article>
  );
}
