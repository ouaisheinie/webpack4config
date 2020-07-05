// dll

let path = require("path")
let webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: {
    react: ["react", "react-dom"]
  },
  output: {
    filename: "bundle.js", // 产生的文件名
    path: path.resolve(__dirname, "dist"),
    library: "_dll_[name]", // 输出的js打包后叫ab
    // libraryTarget: "var" // 默认用var定义方式输出打包后的模块 除此之外还有commonjs  this 等
  },
  plugins: [
    new webpack.DllReferencePlugin({
      // 正式打包的时候 会去dist文件夹找mainfest文件里的清单 如果找不到  再去真正的打包
      manifest: path.resolve(__dirname, "dist", "mainfest.json")
    }), // 用之前bundle.js 975kb 用之后bundle.js 5.51kb
    new webpack.DllPlugin({ // name == library
      name: "_dll_[name]",
      path: path.resolve(__dirname, "dist", "mainfest.json")
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
}