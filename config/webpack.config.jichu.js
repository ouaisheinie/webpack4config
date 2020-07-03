// webpack 配置
const path = require("path")
const HmltWebpackPlugin = require("html-webpack-plugin") // 模板引入
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // 自动删除上一次打包的
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 压缩js
const OptimizeCss = require("optimize-css-assets-webpack-plugin") // 压缩css
const UglifJsWebpackPlugin = require("uglifyjs-webpack-plugin")
const webpack = require("webpack")
require("@babel/polyfill") // 实现一些不能实现的语法

module.exports = {
  mode: "development", // 模式  默认两种  production  devlopment
  entry: "./src/index.js", // 入口
  output: { // 出口
    filename: "bundle.[hash:8].js", // 名字  加hash 每次修改都产生新的文件   8位的hash
    path: path.resolve(__dirname, "build"), // 目录
    // publicPath: "http://www.baidu.com" // 公共的路径 如果资源是放在cdn的话  就需要用到这个
  
  },
  optimization: { // 优化压缩
    minimizer: [
      new UglifJsWebpackPlugin({
        cache: true, // 缓存
        parallel: true, // 是否并发(压缩多个)
        sourceMap: true // 源码映射
      }),
      new OptimizeCss()
    ]
  },
  plugins: [ // 放所有webpack 插件
    // 删除之前打包的无用文件
    new CleanWebpackPlugin(), // 直接调用 不需要加啥呢么路径

    // 引入模板的插件
    new HmltWebpackPlugin({
      template: "./src/index.html", // 模板
      filename: "index.html", //打包后的文件名
      // minify: { // 压缩html 模板
      //   removeAttributeQuotes: true, // 删除双引号
      //   collapseBooleanAttributes: true, // 折叠成一行
      // },
      hash: true, // 引入的js文件添加hash戳
    }),
    new MiniCssExtractPlugin({ // 抽离css文件的
      filename: "css/main.css"
    }),
/*     new webpack.ProvidePlugin({ // 在每个模块中都注入$符号 代表jquery
      $: "jquery"
    }) */
  ],
  externals: { // 告诉 这个模块 是外部引入的  不需要打包 externals
    jquery: "jQuery"
  },
  module: { // 模块
    rules: [ // 规则
      {
        test: /\.html$/i,
        use: 'html-withimg-loader'
      },
      {
        test: /\.(png|jpg|gif)/,
        // use: [{   // 用file-loader
        //   loader: "file-loader",
        //   options: {
        //     esModule: false
        //   }
        // }]
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1, // 图片大小
              esModule: false,  // 这个是file-loader 和 url-loader 5.x版本必须加上的
              outputPath: "/img/", // 输出路径  到img文件夹下
              publicPath: "http://www.baidu.com"
            }
          }
        ] // 做一个限制  当图片小于多少K的时候用base64   大于多少k  用file-loader来产生真实的图片
      },
      {
        test: /\.js$/,
        use: { 
          loader: "babel-loader",
          options: { // 把ES6 转换成 ES5
            presets: [
              "@babel/preset-env"
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }], // 修饰器编译需要的
              ["@babel/plugin-proposal-class-properties", { "loose": true }], // es6 类的编译需要的
              "@babel/plugin-transform-runtime" // 转化generator 或者 其他新特性的插件
            ]
          }
        },
        include: path.resolve(__dirname, "src"),
        exclude: /node_module/ // 排除掉 node_module
      },
      // css-loader 连续 @import 这样的语法
      // style-loader 把css 插入到head的标签中  loder的特点就是希望单一
      {
        test: /\.css$/, 
        use: [
          MiniCssExtractPlugin.loader, // 抽离css文件的配置成一个文件 抽离出来 build里面会多一个main.css
          'css-loader',
          'postcss-loader'
        ]  // loader是有顺序的  默认是从右向左执行 从下向上执行
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, // 抽离less文件的配置成一个文件  抽离出来 build里面会多一个main.css
          'css-loader',
          'postcss-loader',
          'less-loader' // 从下向上执行 先执行less-loader 再执行css-loader  最后执行style-loader 把样式加进html中
        ]
      }
    ]
  },
  devServer: { // 开发服务器的配置
    port: 3000, // 端口
    progress: true, // 进度条
    contentBase: "./build", // 指向目录
    compress: true, // 压缩代码
  }
}