var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
res.sendFile('index.html', { root: __dirname+"/public"});
});

//Whenever someone connects this gets executed
var clients = 0;
io.on('connection', function(socket) {
   clients++;
   io.sockets.emit('event',{ description: clients + ' clients connected!'});
   socket.on('disconnect', function () {
      clients--;
      io.sockets.emit('event',{ description: clients + ' clients connected!'});
   });
    
    socket.on('publishdata',function(data)
    {
    console.log("Received from Client "+ data);
    io.sockets.emit('event',data);
    });
    
    socket.on('ipaddress',function(data)
    {
    console.log("IP ADDRESS"+data);
    });
    
   });
   

	
	
	
http.listen(3100, function() {
   console.log('listening on *:3100');
});

