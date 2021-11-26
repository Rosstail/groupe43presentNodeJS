const userRouter = require('./routes/userRouter');
const nunjucks = require('nunjucks')
const config = require('./config');
var db_handler = require('./db_handler')
const session = require('cookie-session')
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const user = require('./controllers/userController')
const port = config.webPort
const host = config.webHost
const protocol = config.webProtocol
const cookie = require('cookie')

const connexion = db_handler.connexion

nunjucks.configure("views", {
  autoescape: true,
  express: app
})

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({express: true}));


app.use("/", express.static(__dirname + "/views"));

//initializing a session
app.use(session(({
  name: 'user-token',
  secret: 'test-user-token',
  cookie: {
      httpOnly: true,
      expires : new Date( Date.now() + 3600000) // = 1heure
  }
})))

app.use('/', userRouter);

io.on('connection', function (socket) { 

  const cookie_session = socket.request.headers.cookie;

  if(cookie_session == undefined)
    console.log("user try to send message without being logged");
    
  else{
    let cookie_user = cookie.parse(cookie_session)
    let buff = Buffer.from(cookie_user['user-token'], 'base64');
    let text = buff.toString('utf-8');
    const cleanToken = text.split("\"", 4)[3]

    let loggedUser
    
    connexion.query("SELECT firstname, lastname FROM itescia.users WHERE token = '" + cleanToken + "'", function(err, result){
      if(err) throw err
      loggedUser = result[0].firstname + "." + result[0].lastname
    })

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
      message.username = loggedUser;
      console.log('message : ' + message.text);
      io.emit('chatgeneral-mesgame', message);
    });

    socket.on('chatgeneral-meswork', function (message) {
      message.username = loggedUser;
      console.log('message : ' + message.text);
      io.emit('chatgeneral-meswork', message);
    });
  }
});

http.listen(3000, function () {
  console.log(`Server running at ${protocol}://${host}:${port}/`);
});

module.exports = app;
