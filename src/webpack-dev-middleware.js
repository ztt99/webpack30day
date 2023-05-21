let express = require('express')

let app = express()
const webpack = require('webpack')
const webpackOptions = require('../webpack.config')

const compiler = webpack(webpackOptions)

const webpackDevMiddleware = require('webpack-dev-middleware')
/**
 * webpackDevMiddleware会返回一个express中间件
 * 1. 会启动webpack编译，产出a.hash.js等
 * 2. 会返回一个中间件，当接受到客户端对这个产出文件的请求时，把文件内容返回
 */
app.use(webpackDevMiddleware(compiler,{}))
app.listen(8000)