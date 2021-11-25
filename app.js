const express = require('express')
const userRouter = require('./routes/userRouter');
const nunjucks = require('nunjucks')
const config = require('./config');
var connexion = require('./db_handler')
const app = express()
let http = require('http').Server(app);
let io = require('socket.io')(http);
let sock = require('./controllers/userController')
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
//app.use('/chat', express.static(__dirname + "/views"));
app.use('/', userRouter);

io.on('connection', function (socket) {
  /**
   * Log de connexion et de déconnexion des utilisateurs
   */
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconected');
  });

  /**
   * Réception de l'événement 'chat-message' et réémission vers tous les utilisateurs
   */
  socket.on('chatgeneral-mesgeneral', function (message) {
    console.log('message : ' + message.text);
    io.emit('chatgeneral-mesgeneral', message);
  });
});

app.listen(port, host, () => {
  console.log(`Server running at ${protocol}://${host}:${port}/`);
});

//app.get('/user', userRouter);
//app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

module.exports = app;
module.exports.host = host
