const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/scripts/main.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    clean: true,
  },

  mode: "development",

  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3001,
    open: true,
  },

  module: {
    rules: [
      // CSS
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      // JS com Babel ✅
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),

    // copiar imagens/assets
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets",
          to: "assets",
        },
      ],
    }),
  ],
};
