let button = document.createElement("button")
button.innerHTML = "hello"

button.addEventListener("click", () => {
  console.log("click")
  // import 懒加载 返回一个promise  是通过jsonp实现的动态加载文件
  import('./source.js').then(res => console.log(res))
  
})

document.body.appendChild(button)