// 多页应用
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
let webpack = require("webpack")

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  // source-map  源码映射  会单独生成一个source-map 文件 而且出错了会标识出当前报错的列和行

  // devtool: 'source-map', // 增加映射文件  方便生产环境调试源代码
  // devtool: "eval-source-map",  // 不会产生单独的文件 但是不会产生行和列
  // devtool: "cheap-module-source-map", // 不会产生列 但是是一个单独的文件  产生后你可以保存起来用来调试
  devtool: "cheap-module-eval-source-map", // 不会产生map文件 集成在打包后的文件中  不会产生列

  watch: true, // 监控当前代码的变化 变化了就实时打包
  watchOptions: { //监控的选项
    poll: 1000, // 美妙问1000次
    aggregateTimeout: 500,// 防抖 我一直输入代码 就500ms
    ignored: /node_modules/
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
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [ // 打包的时候 拷贝一些文件
        { from: "./doc", to: "./"}
      ]
    }),
    new webpack.BannerPlugin("make 2019 by zzy"), // 版权声明  webpack 自带
    new webpack.DefinePlugin({ // 线上模式和测试  开发模式   不同的配置的
      DEV: JSON.stringify('production'), // 这样的production才是一个字符串
      FLAG: 'true', // 这里true 就是 布尔值
      EXPORESSION: '1+1'  // 这里的值等于2
    })
  ],
  resolve: { // 解析
    modules: [path.resolve("node_modules")],
    // alias: {}   // 别名
    // mainFields: ["style", "main"] // 先找style  后找main
    // mainFiles: [] // 指定入口文件的名字  默认找index.js,
    // extensions: [".js", ".css", ".json", ".vue"]  // 这样先找js 后找css 再找json  import的时候可以免写后缀
  },
  devServer: {
  // 代理
   /*  proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: {
          "/api": ""
        }
      }
    } */

  // mock数据
  /* before(app){ // 启动服务之前 调用方法  devserver 内部就是一个express
    app.get("/user", (req, res) => {
      res.json({name: "油琼鹰"})
    })

  } */

  // 有服务端 但是不想用代理 直接在服务端启动 webpack 和 服务 启动在同一端口
  //  详情去看server.js
  }
}