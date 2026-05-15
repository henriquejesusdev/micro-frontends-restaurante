import React from "react";
import PratoCard from "./components/PratoCard";
import "./style.css";

import pizzaImg from "./assets/pizza-margherita.png";
import hamburguerImg from "./assets/hamburguer-artesanal.png";
import lasanhaImg from "./assets/lasanha-bolonhesa.png";
import saladaImg from "./assets/salada-caesar.png";

const pratos = [
  {
    id: 1,
    nome: "Pizza Margherita",
    descricao: "Molho de tomate, queijo, manjericão e massa artesanal.",
    preco: 42.9,
    imagem: pizzaImg
  },
  {
    id: 2,
    nome: "Hambúrguer Artesanal",
    descricao: "Pão brioche, carne 180g, queijo e molho especial.",
    preco: 36.9,
    imagem: hamburguerImg
  },
  {
    id: 3,
    nome: "Lasanha Bolonhesa",
    descricao: "Massa fresca, molho bolonhesa e queijo gratinado.",
    preco: 39.9,
    imagem: lasanhaImg
  },
  {
    id: 4,
    nome: "Salada Caesar",
    descricao: "Alface, frango grelhado, croutons, parmesão e molho Caesar.",
    preco: 29.9,
    imagem: saladaImg
  }
];

export default function CardapioApp() {
  function adicionarAoPedido(prato) {
    // Dispara um evento global para avisar outros micros.
    window.dispatchEvent(
      new CustomEvent("adicionar-prato", {
        detail: prato
      })
    );
  }

  return (
    <section className="cardapio-container">
      <h2>Cardápio</h2>

      <div className="lista-pratos">
        {pratos.map((prato) => (
          <PratoCard
            key={prato.id}
            prato={prato}
            onAdicionar={adicionarAoPedido}
          />
        ))}
      </div>
    </section>
  );
}
