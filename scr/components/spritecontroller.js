
// constant values to increase performance
const PIX2 = Math.PI * 2;
const PID4 = Math.PI / 4;
const PID8 = Math.PI / 8;


game.SpriteController = Object.extend({
	
	init : function(_entity){

		this.entity = _entity;
		this.updateDeltaVector();
		this.bindMouseMove();
	},
	
    updateDeltaVector : function(){
    	this.deltaXVector = me.input.mouse.pos.x;
    	this.deltaYVector = me.input.mouse.pos.x;
    	console.log(this.deltaXVector);
    },
    
    bindMouseMove : function(){
    	    	
    }
    
});



// private void setPosition(Double currentMousePosition) {
// 
// double angle = 0.0;
// int dIndex = 6;
// angle = - StrictMath.atan2(lastYVector , lastXVector);
// if(angle < 0.0){
// angle += PIX2;
// }
// dIndex = (int) Math.floor((angle + PID8) / (PID4));
// if(dIndex == 8){
// dIndex = 0;
// }
// this.getScene().prompt("DIndex: " + Direction.values()[dIndex]);
// this.setDireccion(Direction.values()[dIndex]);
// }