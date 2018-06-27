import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import models from './model'
import path from 'path'
import staticPath from '../build/asset-manifest.json'

import csshook from 'css-modules-require-hook/preset' // import hook before routes
import assethook from 'asset-require-hook'
assethook({
  extensions: ['png', 'jpg']
})

import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import App from '../src/app'
import reducers from '../src/reducer'
import { renderToString, renderToNodeStream } from 'react-dom/server'

const Chat = models.getModel('chat')
const app = express()
// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket) {
  socket.on('sendmsg', function(data) {
    console.log(data)
    const { from, to, msg } = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content: msg}, function(err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})

const userRouter = require('./user')
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use(function(req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next()
  }

  const store = createStore(reducers, compose(
    applyMiddleware(thunk)
  ))
  let context = {}
  /* 
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App></App>
      </StaticRouter>
    </Provider>
  )
  const pageHtml = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <title>招聘 App</title>
      <link rel="stylesheet" href="${staticPath['main.css']}"/>
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="root">${markup}</div>
      <script src=${staticPath['main.js']}></script>
    </body>
  </html>
  
  res.send(pageHtml)
  */

  // react16 新特性
  res.write(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <title>招聘 App</title>
      <link rel="stylesheet" href="${staticPath['main.css']}"/>
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="root">`)
  const markupStream = renderToNodeStream(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App></App>
      </StaticRouter>
    </Provider>
  )
  markupStream.pipe(res, {end:false})
  markupStream.on('end', () => {
    res.write(`
      </div>
        <script src=${staticPath['main.js']}></script>
      </body>
    </html>`)
    res.end()
  })
})
app.use('/', express.static(path.resolve('build')))

server.listen(9093, () => {
  console.log('Node app start at port 9093')
})