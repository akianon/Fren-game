/*EnhancedArray class
 *Used to provided added functionality to arrays
 *
 *Inherits: Array
 */
 
 module.exports = class EnhancedArray extends Array{
	
	set(index,value){
		
		this[index] = value;
		
	}
	
	firstFree(){
		
		for(var i = 0;i <= this.length; ++i){
			
			if(this[i]==undefined){return i;}
			
		}
		
	}
	
 }