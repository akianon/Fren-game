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
class ClientPlayer extends Player{
	
	/*ClientPlayer(Player player)
	 *Constructs a new ClientPlayer
	 *
	 *Arguments:
	 *	player: The Player object to inherit
	 */
	constructor(player){
		
		super();
		
		this.x = player.x;
		this.y = player.y;
		this.id = player.id;
		this.number = player.number;

		this.direction = player.direction;
		
		//console.log(this.direction);
		
		this.maxSpd = player.maxSpd;
        this.currentWorld = player.currentWorld;

        this.sprite = player.sprite;
	
	}//constructor(x,y,id,sprite){
	
	/*draw()
	 *Draws the player.
	 */
	draw(ctx,sprite){
	
		var tileSize = 64;
		var imageNumTiles = 7; // The number of tiles per row in the tileset image
		var frame = frame;

		ctx.clearRect(0, 0, 500, 500);
		var tileRow = (frame / imageNumTiles) | 0; // Bitwise OR operation
		var tileCol = (frame % imageNumTiles) | 0;
		
		ctx.drawImage(sprite, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (this.x), (this.y), tileSize, tileSize);
        
    }//draw(){
	
}//class ClientPlayer{