import React, { useEffect, useState } from "react";
import PedidoItem from "./components/PedidoItem";
import "./style.css";

export default function PedidoApp() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    function receberPrato(event) {
      const prato = event.detail;

      setItens((itensAtuais) => {
        const itemExistente = itensAtuais.find((item) => item.id === prato.id);

        if (itemExistente) {
          return itensAtuais.map((item) =>
            item.id === prato.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          );
        }

        return [...itensAtuais, { ...prato, quantidade: 1 }];
      });
    }

    // Escuta o evento enviado pelo micro-cardapio.
    window.addEventListener("adicionar-prato", receberPrato);

    return () => {
      window.removeEventListener("adicionar-prato", receberPrato);
    };
  }, []);

  function diminuirItem(id) {
    setItens((itensAtuais) =>
      itensAtuais
        .map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function removerItem(id) {
    setItens((itensAtuais) => itensAtuais.filter((item) => item.id !== id));
  }

  function limparPedido() {
    setItens([]);
  }

  const totalItens = itens.reduce((total, item) => total + item.quantidade, 0);
  const totalPedido = itens.reduce(
    (total, item) => total + (item.preco || 0) * item.quantidade,
    0
  );
  const totalFormatado = totalPedido.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  return (
    <section className="pedido-container">
      <h2>Pedido</h2>
      <p className="subtitle">Itens adicionados ao pedido.</p>

      {itens.length === 0 ? (
        <p className="pedido-vazio">Nenhum item adicionado ainda.</p>
      ) : (
        <div className="lista-pedido">
          {itens.map((item) => (
            <PedidoItem
              key={item.id}
              item={item}
              onDiminuir={() => diminuirItem(item.id)}
              onRemover={() => removerItem(item.id)}
            />
          ))}
        </div>
      )}

      <div className="resumo-pedido">
        <span>Total de itens: {totalItens}</span>
        <strong>{totalFormatado}</strong>
        {itens.length > 0 && (
          <button type="button" onClick={limparPedido}>
            Limpar pedido
          </button>
        )}
      </div>
    </section>
  );
}
