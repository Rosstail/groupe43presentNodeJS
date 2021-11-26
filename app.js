const express = require('express')
const userRouter = require('./routes/userRouter');
const nunjucks = require('nunjucks')
const config = require('./config');
var connexion = require('./db_handler')
const session = require('cookie-session')

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
  console.log(`Server running at ${protocol}://${host}:${port}/`);
});

app.use(session(({
  name: 'user-token',
  secret: 'test-user-token',
  cookie: {
      httpOnly: true,
      expires : new Date( Date.now() + 3600000) // = 1heure
  }

})))

app.use('/', userRouter);

//app.get('/user', userRouter);
//app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

module.exports = app;
