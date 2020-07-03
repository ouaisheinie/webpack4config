// 多页应用
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    index2: "./src/index2.js"
  },
  output: {
    // name 代表 index1 和 index2
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ['index'] // index 里面引入 index1 js文件
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index2.html",
      chunks: ['index', 'index2'] // index2.html 里面引入 index 和 index2  js 文件
    })
  ]
}