// dll

let path = require("path")
let webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "production",
  optimization: { // 公共代码分割
    splitChunks: { // 多个入口的时候 多页应用的时候用
      cacheGroups: { // 缓存租
        common: { // 公共模块
          chunks: "initial",
          minSize: 0,
          minChunks: 1, // 最小引入次数
        },
        // 抽离出第三方模块  比如jquery
        vendor: {
          priority: 1, // 权重  为1就是先抽离第三方模块
          test: /node_modules/, // 引入node_modules 就抽离出来
          chunks: "initial",
          minSize: 0,
          minChunks: 1, // 最小引入次数
        }

      }
    }
  },
  entry: {
    index: "./src/index.js",
    test: "./src/test.js"
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