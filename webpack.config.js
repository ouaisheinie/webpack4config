// 优化
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
let webpack = require("webpack")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    noParse:/jquery/, // 不用检测解析jquery里面有没有其他包的依赖关系  直接打包
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除
        include: path.resolve("src"), // 包含
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
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/) // 忽略掉语言包  引入local以后  不打包moment
  ]
}