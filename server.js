var express = require('express');
var app = express();

var server = require('http').createServer(app);

var io = require('socket.io')(server);

app.all('*', function(req, res, next){
  res.header('Access-Control-Allow-Origin',  '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method === 'OPTIONS'){
    res.send(200);
  }
  else{
    next();
  }
});

app.get('/', function (req, res, ext) {
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