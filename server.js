var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
        console.log("joined room "+ room)
        socket.join(room);
    });

    socket.on('message', function(msg){
    	var rawData = JSON.parse(msg);
    	io.sockets.in(rawData.room).emit('message', msg);
  	});

});

http.listen(9000, function(){
  console.log('listening on *:9000');
});
