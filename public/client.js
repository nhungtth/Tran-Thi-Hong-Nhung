var socket = io();
socket.on('connect', function (data) {
  socket.emit('join', 'A clien is joining chatroom');
});

socket.on('chat', function (data) {
  $('#chatArea').append('<p> <b>' + data.username + '</b>:  ' + data.message + '</li>')
});

$('form').submit(function () {
  var username = $("#username").val();
  var message = $('#message').val();
  if (username != "") {
    socket.emit('messages', { username: username, message: message });
    $("#message").val("");
  } else {
    alert("Enter your name!");
  }

  return false;
});
