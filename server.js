var express = require('express');
var app = express();

var server = require('http').createServer(app);

var io = require('socket.io')(server);

app.get('/', function (req, res, ext) {
  res.writeHead(200, {'Content-type': 'text/plain;charset=UTF8', 'Access-Control-Allow-Origin': '*'})
  res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static('public'));

io.on('connection', function (client) {
  console.log('Client sended...');
  client.on('join', function (data) {
    console.log(data);
  });
  client.on('messages', function (data) {
    client.emit('chat', data);
    client.broadcast.emit('chat', data);
  });
});
server.listen(process.env.PORT || 8000)