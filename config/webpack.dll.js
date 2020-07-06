// dll

let path = require("path")
let webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// 使用happypack 可以进行多线程打包
const Happypack = require("happypack")

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
  module: {
    noParse: /Jquery/, // 不去解析jquery中的依赖库
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve("src"),
        /* use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        } */
        // 这里利用happypack 上面use 就卸载plugins里面了
        use: "Happypack/loader?id=js", // 打包js的  后面插件里面继续
      }
    ]

  },
  plugins: [
    new Happypack({
      id: "js",
      use: [ // 这里use 就是一个数组了
        {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        }
      ]
    }),
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