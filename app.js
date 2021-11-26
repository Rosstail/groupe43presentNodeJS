const userRouter = require('./routes/userRouter');
const nunjucks = require('nunjucks')
const config = require('./config');
var connexion = require('./db_handler')

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
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

app.use("/", express.static(__dirname + "/views"));
app.use('/', userRouter);

io.on('connection', function (socket) {
  var loggedUser = 'toto';

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
    message.username = loggedUser;
    console.log('message : ' + message.text);
    io.emit('chatgeneral-mesgeneral', message);
  });

  socket.on('chatgeneral-mesgame', function (message) {
    message.username = loggedUser.username;
    console.log('message : ' + message.text);
    io.emit('chatgeneral-mesgame', message);
  });

  socket.on('chatgeneral-meswork', function (message) {
    message.username = loggedUser.username;
    console.log('message : ' + message.text);
    io.emit('chatgeneral-meswork', message);
  });

});

http.listen(3000, function () {
  console.log(`Server running at ${protocol}://${host}:${port}/`);
});

module.exports = app;
