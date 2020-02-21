var Player = require('./Player.js');

/*ServerPlayer class
 *Used to store player information and action handling on the server.
 *
 *Field summary:
 *			 x: The x-coordinate position of the player.
 *	 	   	 y: The y-coordinate position of the player.
 *		  	id: The socket ID of the player.
 *	  	number: The identifier number of the player. The number is gained by the current UNIX time + the socket ID.
 *	  directon: Stores true/false values of keypresses in directions up, down, left, and right.
 *		maxSpd: The maximum speed that the player can move.
 *currentWorld: The current world the player is inside.
 *	  	sprite: The sprite values of the player.
 *
 *Inherits: Player
 */
module.exports = class ServerPlayer extends Player{
	
	/*ServerPlayer(Player player)
	 *Constructs a new ServerPlayer
	 *
	 *Arguments:
	 *	   x: The x-coordinate of the player.
	 *	   y: The y-coordinate of the player.
	 *	  id: The socket ID of the player.
	 *sprite: The sprite values of the player.
	 */
	constructor(x,y,id,sprite){

		super(x,y,id,sprite);

	}//constructor(x,y,id,sprite){
	
	/*updatePosition()
	 *Updates the player position using the direction values.
	 */
	updatePosition(){
		
        if(this.direction.pressingRight) this.x += this.maxSpd;
        if(this.direction.pressingLeft) this.x -= this.maxSpd;
        if(this.direction.pressingUp) this.y -= this.maxSpd;
        if(this.direction.pressingDown) this.y += this.maxSpd;
        
        //shorter linewise I think its less efficient though.
       // this.x += (this.direction.pressingRight- this.direction.pressingLeft) * this.maxSpd;
       // this.y += (this.direction.pressingDown - this.direction.pressingUp) * this.maxSpd;
       

        return this;
	}//updatePosition(){
	
}//class ServerPlayer{
