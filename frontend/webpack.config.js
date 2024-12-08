const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.jsx", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output bundle file
    publicPath: "/", // Public path for the application
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transpile .js and .jsx files using Babel
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/, // Load CSS files
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // Load image files
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Resolve .js and .jsx extensions
  },
  devServer: {
    historyApiFallback: true, // Enable history API fallback for React Router
    static: {
      directory: path.join(__dirname, "dist"), // Static content served from 'dist'
    },
    compress: true,
    port: 8080, // Development server port
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html", // HTML template file
      filename: "index.html",
    }),
  ],
};
