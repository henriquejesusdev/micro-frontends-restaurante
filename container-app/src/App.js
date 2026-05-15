import React, { Suspense } from "react";

// Importação dos micros usando Module Federation.
const CardapioApp = React.lazy(() => import("cardapio/CardapioApp"));
const PedidoApp = React.lazy(() => import("pedido/PedidoApp"));

export default function App() {
  return (
    <main className="app">
      <header className="header">
        <h1>Restaurante Micro Frontends</h1>
        <p>
          Aplicação container integrando Micro Cardápio e Micro Pedido com
          Webpack Module Federation.
        </p>
      </header>

      <section className="micro-grid">
        <Suspense fallback={<p>Carregando cardápio...</p>}>
          <CardapioApp />
        </Suspense>

        <Suspense fallback={<p>Carregando pedido...</p>}>
          <PedidoApp />
        </Suspense>
      </section>
    </main>
  );
}
