/*Player class
 *Used to store player information and action handling.
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
 *Known subclasses: ClientPlayer,ServerPlayer
 */

class Player{
	
	/*Player(int x,int y,int id,Sprite sprite)
	 *Constructs a new Player
	 *
	 *Arguments:
	 *	   x: The x-coordinate of the player.
	 *	   y: The y-coordinate of the player.
	 *	  id: The socket ID of the player.
	 *sprite: The sprite values of the player.
	 */
	constructor(x,y,id,sprite){

		this.x = x;
		this.y = y;
		this.id = id;
		this.number = new Date().getTime()+id;

		this.direction = {

			pressingRight:false,
			pressingLeft:false,
        	pressingUp:false,
        	pressingDown:false

        }//this.direction = {
		
		//console.log(this.direction);
		
		this.maxSpd = 10;
        this.currentWorld = 1;

        this.sprite = {	//Placeholder

           	head:1,
           	body:1,
           	legs:1

        }//this.sprite = {

	}//constructor(){
		
	toPlayer(player){}

}//class Player{