const express = require("express")
const webpack = require("webpack")
let middle = require("webpack-dev-middleware")

let config = require("./webpack.config.js")

let complier = webpack(config)

let app = express()
app.use(middle(complier))

app.get("/user", (req, res) => {
  res.json({name: "zhangzeyi"})
})

app.listen(3000)