var Player = require('./Player.js');

/*ClientPlayer class
 *Used to store player information and action handling on the client.
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
module.exports = class ClientPlayer extends Player{
	
	/*ClientPlayer(Player player)
	 *Constructs a new ClientPlayer
	 *
	 *Arguments:
	 *	player: The Player object to inherit
	 */
	constructor(player){
		
		super(player.x,player.y,player.id,player.sprite);
		
		this.number = player.number;

		this.direction = {...player.direction};
		
		//console.log(this.direction);
		
		this.maxSpd = player.maxSpd;
        this.currentWorld = player.currentWorld;

        this.sprite = player.sprite;
	
	}//constructor(x,y,id,sprite){
	
	/*draw()
	 *Draws the player.
	 */
	draw(){
		
    }//draw(){
	
}//class ClientPlayer{