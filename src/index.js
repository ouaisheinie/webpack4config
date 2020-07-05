import jquery from "jquery"
import moment from "moment"
import React from "react"
import { render } from "react-dom"
// 设置语言
// 手动引入所需要的语言
import "moment/locale/zh-cn"
moment.locale("zh-cn")
let r = moment().endOf("day").fromNow()
console.log(r)


/* let xhr = new XMLHttpRequest()

// xhr.open("GET", "/api/user", true)  // devServer proxy

xhr.open("GET", "/user", true)  // devServer mock数据

xhr.onload = function(){
  console.log(xhr.response)
}

xhr.send()
 */

