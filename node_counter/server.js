var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var count = 0; //contador
var port = 8080; //porto de escuta
server.listen(port);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


io.sockets.on('connection', function (socket) {
  socket.emit('count', count);
  socket.on('inc', function () {
    count++;
    io.sockets.emit('count', count);
  });
});
