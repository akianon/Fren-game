var express = require('express');
var app = express();
var serv = require('http').Server(app);
var Player = require('./res/Player.js');

app.get('/',function(req,res){
    res.sendFile(__dirname+'/client/index.html');
});
app.use('/client',express.static(__dirname+'/client'));

serv.listen(2000);

console.log("Server started on "+new Date().toISOString());

var SOCKET_LIST = {};
var PLAYER_LIST = {};
var DEBUG = true;

var map={};
var ground = new Array(20).fill(new Array(32).fill(0));	//32-position, 20-height

map[1] = ground;

var io = require('socket.io')(serv,{});

io.sockets.on('connection', function(socket){
	
	console.log('socket connection');
	socket.id = Math.random();
	socket.x = 0;
	socket.y = 0;
	
	SOCKET_LIST[socket.id] = socket;
    
	var player = new Player(250,250,socket.id,{});
	
	PLAYER_LIST[socket.id] = player;
    
    
	socket.on('disconnect',function(){
	
	delete SOCKET_LIST[socket.id];
	delete PLAYER_LIST[socket.id];

    });
    
    socket.on('sendMsgToServer',function(data){
        var playerName = ("" + socket.id).slice(2,7);
        for(var i in SOCKET_LIST){
            SOCKET_LIST[i].emit('addToChat',playerName + ": " +data);
        }
    });
    
     socket.on('requestWorld',function(data){
  //  console.log(map[1]);
         console.log('sending world '+ PLAYER_LIST[socket.id].currentWorld);
      socket.emit('worldUpdate',map[PLAYER_LIST[socket.id].currentWorld]);
      console.log();
    });
    
    socket.on('evalServer',function(data){
         if(!DEBUG){
             return;
         }
         var res = eval(data);
         socket.emit('evalAnswer',res);
    });
    
    socket.on('keyPress',function(data){
       if(data.inputId === 'left')
           player.direction.pressingLeft = data.state;
       else if(data.inputId === 'right')
           player.direction.pressingRight = data.state;
       else if(data.inputId === 'up')
           player.direction.pressingUp = data.state;
       else if(data.inputId === 'down')
           player.direction.pressingDown = data.state;
    });

    
});
//play pos

setInterval(function(){
    var pack =[];
    for(var i in PLAYER_LIST){
        var player = PLAYER_LIST[i];
        player.updatePosition();
        pack.push({
            p:player,
            x:player.x,
            y:player.y,
            number:player.number
    });
    }
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions',pack);
    }
    
        
},1000/25);
