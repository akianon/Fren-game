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
	
	
	socket.id = getSocket();
	log('New socket connection '+socket.id);
	socket.x = 0;
	socket.y = 0;
	
	SOCKET_LIST[socket.id] = socket;
    
	var player = new Player(250,250,socket.id,{});
	
	PLAYER_LIST[socket.id] = player;
    
    
	socket.on('disconnect',function(){
	
		log('Socket '+socket.id+' disconnect');
		
		delete SOCKET_LIST[socket.id];
		delete PLAYER_LIST[socket.id];

    });
    
    socket.on(67,function(data){	//67 clientSendMsgToServer
        var playerName = ("" + socket.id).slice(2,7);
        for(var i in SOCKET_LIST){
			SOCKET_LIST[i].emit(3,playerName + ": " +data);	//3 serverSendMsgToClient
        }
    });
    
     socket.on(65,function(data){	//65 clientRequestWorld
		//console.log(map[1]);
		log('Sending world ' + PLAYER_LIST[socket.id].currentWorld + ' to ' + socket.id);
		socket.emit(1,map[PLAYER_LIST[socket.id].currentWorld]);	//1 serverWorldUpdate
    });
    
    socket.on(68,function(data){	//68 clientEvalServer
		if(!DEBUG){
			return;
		}
		var res = eval(data);
		socket.emit(4,res);	//4 serverEvalAnswer
    });
    
    socket.on(66,function(data){	//66 clientKeyPress	//0U,1D,2L,3R
			player.direction = data;
    });

    
});
//play pos

setInterval(function(){
    var pack =[];
    PLAYER_LIST.forEach(function(elem){
			elem = (Object.assign(new ServerPlayer(),elem).updatePosition()).toPlayer();	//Hacky, solution. Sets player to ServerPlayer, updates position, and returns original player in one line
			//log( player.updatePosition().x);
			pack.push(elem);
        
			Object.assign(PLAYER_LIST[elem.id],elem);
	});
	
	//console.log(pack);
    SOCKET_LIST.forEach(function(elem){elem.emit(2,pack);});	//2 serverNewPositons
        
},1000/25);

function log(string){
	console.log(new Date().toISOString()+': '+string);
}//log(string){

function getSocket(){
	for(var i=0;i<=SOCKET_LIST.length;++i){
		if(SOCKET_LIST[i]==undefined) return i;
	}
}
