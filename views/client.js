/*global io*/
var socket = io();

/**
 * Envoi d'un message
 */
$('#formgeneral').submit(function (e) {
  e.preventDefault();
  var message = {
    text : $('#sendgeneral').val()
  };
  $('#sendgeneral').val('');
  if (message.text.trim().length !== 0) { // Gestion message vide
    socket.emit('chatgeneral-mesgeneral', message);
  }
  $('#chatgeneral input').focus(); // Focus sur le champ du message
});

/**
 * Réception d'un message
 */
socket.on('chatgeneral-mesgeneral', function (message) {
  $('#mesgeneral').append($('<li>').text(message.text));
});


/**
 * Envoi d'un message
 */
$('#formgame').submit(function (e) {
  e.preventDefault();
  var message = {
    text : $('#sendgame').val()
  };
  $('#sendgame').val('');
  if (message.text.trim().length !== 0) { // Gestion message vide
    socket.emit('chatgeneral-mesgame', message);
  }
  $('#chatgame input').focus(); // Focus sur le champ du message
});

/**
 * Réception d'un message
 */
socket.on('chatgeneral-mesgame', function (message) {
  $('#mesgame').append($('<li>').text(message.text));
});


/**
 * Envoi d'un message
 */
$('#formwork').submit(function (e) {
  e.preventDefault();
  var message = {
    text : $('#sendwork').val()
  };
  $('#sendwork').val('');
  if (message.text.trim().length !== 0) { // Gestion message vide
    socket.emit('chatgeneral-meswork', message);
  }
  $('#chatwork input').focus(); // Focus sur le champ du message
});

/**
 * Réception d'un message
 */
socket.on('chatgeneral-meswork', function (message) {
  $('#meswork').append($('<li>').text(message.text));
});
