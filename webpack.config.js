// dll

let path = require("path")
let webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].js", // 产生的文件名
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    noParse: /Jquery/, // 不去解析jquery中的依赖库
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve("src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        }
      }
    ]

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
}