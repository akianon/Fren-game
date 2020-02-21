var express = require('express');
var app = express();
var serv = require('http').Server(app);
var Player = require('./res/Player.js');
var ServerPlayer = require('./res/ServerPlayer.js');

app.get('/',function(req,res){
    res.sendFile(__dirname+'/client/index.html');
});
app.use('/client',express.static(__dirname+'/client'));

serv.listen(2000);

log('Server started on '+new Date().toString());

var SOCKET_LIST = [];
var PLAYER_LIST = [];
var DEBUG = true;

var map=[];
var ground = new Array(20).fill(new Array(32).fill(0));	//Makes 2D array of 32-position, 20-height

map[1] = ground;

var io = require('socket.io')(serv,{});

io.sockets.on('connection', function(socket){
	
	socket.id = SOCKET_LIST.length;
	log('New socket connection '+socket.id);
	socket.x = 0;
	socket.y = 0;
	
	SOCKET_LIST[socket.id] = socket;
    
	var player = new Player(250,250,socket.id,{});
	
	PLAYER_LIST[socket.id] = player;
    
    
	socket.on('disconnect',function(){
	
		log('Socket '+socket.id+' disconnect');
	
		SOCKET_LIST.splice(socket.id,1);
		PLAYER_LIST.splice(socket.id,1);

    });
    
    socket.on('sendMsgToServer',function(data){
        var playerName = ("" + socket.id).slice(2,7);
        for(var i in SOCKET_LIST){
			SOCKET_LIST[i].emit('addToChat',playerName + ": " +data);
        }
    });
    
     socket.on('requestWorld',function(data){
		//console.log(map[1]);
		log('Sending world ' + PLAYER_LIST[socket.id].currentWorld + ' to ' + socket.id);
		socket.emit('worldUpdate',map[PLAYER_LIST[socket.id].currentWorld]);
    });
    
    socket.on('evalServer',function(data){
		if(!DEBUG){
			return;
		}
		var res = eval(data);
		socket.emit('evalAnswer',res);
    });
    
    socket.on('keyPress',function(data){	//0L,1R,2U,3D
			player.direction.pressingLeft = data[0] || false;
			player.direction.pressingRight = data[1] || false;
			player.direction.pressingUp = data[2] || false;
			player.direction.pressingDown = data[3] || false;
    });

    
});
//play pos

setInterval(function(){
    var pack =[];
    PLAYER_LIST.forEach(function(elem){
		var player = Object.assign(new ServerPlayer(),elem);
        player.updatePosition();
        pack.push(player.toPlayer());
	});
	
	//console.log(pack);
    SOCKET_LIST.forEach(function(elem){elem.emit('newPositions',pack);});
        
},1000/25);

function log(string){
	console.log(new Date().toISOString()+': '+string);
}//log(string){