var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/**
 * Gestion des requêtes HTTP des utilisateurs en leur renvoyant les fichiers du dossier 'public'
 */
app.use("/chat", express.static(__dirname + "/views/chat.html"));

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

/**
 * Lancement du serveur en écoutant les connexions arrivant sur le port 3000
 */
http.listen(3000, function () {
  console.log('Server is listening on *:3000');
});
