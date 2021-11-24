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

// Connection BDD
mongoose.connect(config.db_address, {useNewUrlParser: true, useUnifiedTopology: true});
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to Mongoose")
});

nunjucks.configure("views", {
  autoescape: true,
  express: app
})

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

app.use('/', userRouter);
//app.use('/user', userRouter);

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//app.get('/user', userRouter);
//app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

module.exports = app;