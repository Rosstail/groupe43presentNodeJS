const express = require('express')
//const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRouter');
const config = require('./config');
const nunjucks = require('nunjucks')
const mongoose = require('mongoose')
//const catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site
const app = express()
const port = config.webPort
const host = config.webHost
const protocol = config.webProtocol

nunjucks.configure("views", {
  autoescape: true,
  express: app
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, host, () => {
  console.log(`Example app listening at ${protocol}://${host}:${port}`)
})

// Home page route.
app.get('/test', function (req, res) {
    res.send('Wiki home page');
})

// About page route.
app.get('/about', function (req, res) {
  res.send('About this wiki');
})

//app.use('/', indexRouter);
app.use('/user', userRouter);

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//app.get('/user', userRouter);
//app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

module.exports = app;