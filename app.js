const express = require('express')
const userRouter = require('./routes/userRouter');
const config = require('./config');
const nunjucks = require('nunjucks')

const app = express()
const port = config.webPort
const host = config.webHost
const protocol = config.webProtocol

nunjucks.configure("views", {
  autoescape: true,
  express: app
})

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({express: true}));

app.listen(port, host, () => {
  console.log(`Example app listening at ${protocol}://${host}:${port}`)
})

//app.use('/', indexRouter);
app.use('/user', userRouter);

//app.get('/user', userRouter);
//app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

module.exports = app;