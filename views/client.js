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
// socket.on('chatgeneral-mesgeneral', function (message) {
//   $('#mesgeneral').append($('<li>').text(message.text));
// })
socket.on('chatgeneral-mesgeneral', function (message) {
  $('#mesgeneral').append($('<li>').html('<span class="username">' + message.username + '</span> ' + message.text));
});
