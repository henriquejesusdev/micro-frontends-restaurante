const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  mode: "development",
  entry: "./src/index.js",

  devServer: {
    port: 3010,
    historyApiFallback: true
  },

  output: {
    publicPath: "auto",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        cardapio: "cardapio@http://localhost:3001/remoteEntry.js",
        pedido: "pedido@http://localhost:3002/remoteEntry.js"
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"]
        }
      }
    }),

    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
