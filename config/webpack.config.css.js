// webpack 配置
const path = require("path")
const HmltWebpackPlugin = require("html-webpack-plugin") // 模板引入
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // 自动删除上一次打包的

module.exports = {
  mode: "development", // 模式  默认两种  production  devlopment
  entry: "./src/index.js", // 入口
  output: { // 出口
    filename: "bundle.[hash:8].js", // 名字  加hash 每次修改都产生新的文件   8位的hash
    path: path.resolve(__dirname, "build"), // 目录
  },
  plugins: [ // 放所有webpack 插件
    // 删除之前打包的无用文件
    new CleanWebpackPlugin(), // 直接调用 不需要加啥呢么路径

    // 引入模板的插件
    new HmltWebpackPlugin({
      template: "./src/index.html", // 模板
      filename: "index.html", //打包后的文件名
      minify: { // 压缩html 模板
        removeAttributeQuotes: true, // 删除双引号
        collapseBooleanAttributes: true, // 折叠成一行
      },
      hash: true, // 引入的js文件添加hash戳

    }),
  ],
  module: { // 模块
    rules: [ // 规则
      // css-loader 连续 @import 这样的语法
      // style-loader 把css 插入到head的标签中  loder的特点就是希望单一
      {
        test: /\.css$/, 
        use: [
          {
            loader: 'style-loader',
            options: {
              // insert: "head" // 添加到head的
              insert: function insertAtTop(element){ // 添加到head最前面
                let parent = document.querySelector("head")
                var lastInsertedElement =
                  window._lastElementInsertedByStyleLoader;
 
                if (!lastInsertedElement) {
                  parent.insertBefore(element, parent.firstChild);
                } else if (lastInsertedElement.nextSibling) {
                  parent.insertBefore(element, lastInsertedElement.nextSibling);
                } else {
                  parent.appendChild(element);
                }
 
                // eslint-disable-next-line no-underscore-dangle
                window._lastElementInsertedByStyleLoader = element;
              }
            }
          },
          'css-loader',
        ]  // loader是有顺序的  默认是从右向左执行 从下向上执行
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'head'
            }
          },
          'css-loader',
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