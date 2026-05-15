# Restaurante Micro Frontends

Projeto criado para praticar **Micro Frontends** usando **React**, **JavaScript** e **Webpack Module Federation**.

A aplicação simula um sistema simples de restaurante. O usuário visualiza o cardápio, adiciona pratos ao pedido, controla quantidades e acompanha o total em tempo real.

## Aplicações

O projeto possui três aplicações separadas:

| Aplicação | Porta | Função |
| --- | --- | --- |
| `container-app` | `3010` | Aplicação principal que integra os micros |
| `micro-cardapio` | `3001` | Lista os pratos disponíveis |
| `micro-pedido` | `3002` | Exibe e controla os itens adicionados ao pedido |

## Tecnologias

- React
- JavaScript
- Webpack 5
- Module Federation
- Babel
- CSS

## Estrutura

```text
micro-frontends-restaurante/
├─ container-app/
├─ micro-cardapio/
├─ micro-pedido/
├─ .gitignore
└─ README.md
```

## Funcionalidades

- Exibir pratos com imagem, descrição e preço.
- Adicionar pratos ao pedido.
- Agrupar produtos repetidos por quantidade.
- Diminuir uma unidade do produto.
- Remover todas as unidades de um produto.
- Limpar o pedido inteiro.
- Calcular automaticamente o total do pedido.

## Como Rodar Cada Micro

Cada micro frontend tem suas próprias dependências. Por isso, rode `npm install` dentro de cada pasta.

### 1. Micro Cardápio

Em um terminal:

```bash
cd micro-cardapio
npm install
npm start
```

URL:

```text
http://localhost:3001
```

### 2. Micro Pedido

Em outro terminal:

```bash
cd micro-pedido
npm install
npm start
```

URL:

```text
http://localhost:3002
```

### 3. Container App

Em outro terminal:

```bash
cd container-app
npm install
npm start
```

URL principal do projeto:

```text
http://localhost:3010
```

## Como Acessar o Projeto

Depois de subir os três micros, acesse apenas:

```text
http://localhost:3010
```

O `container-app` carrega automaticamente:

- `micro-cardapio` pela URL `http://localhost:3001/remoteEntry.js`
- `micro-pedido` pela URL `http://localhost:3002/remoteEntry.js`

## Como Funciona a Comunicação Entre Eles

O projeto usa duas ideias principais:

1. **Module Federation**

O `container-app` importa os micros remotos:

```js
const CardapioApp = React.lazy(() => import("cardapio/CardapioApp"));
const PedidoApp = React.lazy(() => import("pedido/PedidoApp"));
```

O `micro-cardapio` expõe:

```js
exposes: {
  "./CardapioApp": "./src/CardapioApp"
}
```

O `micro-pedido` expõe:

```js
exposes: {
  "./PedidoApp": "./src/PedidoApp"
}
```

2. **Evento global do navegador**

Quando o usuário clica em **Adicionar ao pedido**, o `micro-cardapio` dispara um evento:

```js
window.dispatchEvent(
  new CustomEvent("adicionar-prato", {
    detail: prato
  })
);
```

O `micro-pedido` escuta esse evento:

```js
window.addEventListener("adicionar-prato", receberPrato);
```

Assim, o `micro-cardapio` não precisa importar o `micro-pedido` diretamente. Eles se comunicam por evento, mantendo os micros mais independentes.

## Scripts

Dentro de cada aplicação:

```bash
npm start
```

Sobe o servidor de desenvolvimento.

```bash
npm run build
```

Gera o build da aplicação.

## Observações

- O container roda na porta `3010`.
- O cardápio roda na porta `3001`.
- O pedido roda na porta `3002`.
- Os três precisam estar rodando ao mesmo tempo.
- Se o navegador não atualizar o visual, use `Ctrl + F5`.
- As pastas `node_modules` e `dist` não devem ser enviadas para o GitHub.

## Autor

Desenvolvido por **Henrique Jesus**.
