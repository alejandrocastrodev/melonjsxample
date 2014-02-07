// constant values to increase performance
const PIX2 = Math.PI * 2;
const PID4 = Math.PI / 4;
const PID8 = Math.PI / 8;

game.SpriteController = Object.extend({

	init : function(_entity) {
		this.entity = _entity;
		this.middleWidth = _entity.width / 2;
		this.middleHeight = _entity.height / 2;
		
		this.bindMouseMove();
		
		//this.testDirection();
	},

	bindMouseMove : function() {
		me.input.registerPointerEvent('mousemove', me.game.viewport,
				this.updateSprite.bind(this));
	},

	updateSprite : function(e) {
		// for(prop in e){
			// console.log(prop);
		// }
		
		//set 'x' and 'y' delta between mouse and player's center
		this.deltaX = e.gameScreenX - this.entity.pos.x - this.middleWidth;		
		console.log("this.entity.pos.x:" + this.entity.pos.x);	
		console.log("e.gameScreenX:" + e.gameX);
		this.deltaY = e.gameScreenY - this.entity.pos.y - this.middleHeight;
		console.log("this.entity.pos.y:" + this.entity.pos.y);
		console.log("e.gameScreenY:" + e.gameY);
		//this.getAngle();
		
	},
	
	getAngle : function(){		
		//this.angle = 0.0;
		this.dIndex = 6;
		this.angle = Math.atan(this.deltaY / this.deltaX);
		if(this.deltaX < 0.0)	this.angle += Math.PI;
		
		
		
		console.log("angle:" + this.angle);
		return this.angle;
	},
	
	
	testDirection : function(){
		this.deltaX = 0; this.deltaY = -1;
		console.log("[x  0 | y -1]  '' :"    + this.getAngle());
		
		this.deltaX = 1; this.deltaY = -1;
		console.log("[x  1 | y -1]  >' :"    + this.getAngle());
		
		this.deltaX = 1; this.deltaY = 0;
		console.log("[x  1 | y  0]  >> :"    + this.getAngle());
		
		this.deltaX = 1; this.deltaY = 1;
		console.log("[x  1 | y  1]  >. :"    + this.getAngle());
		
		this.deltaX = 0; this.deltaY = 1;		
		console.log("[x  0 | y  1]  .. :"    + this.getAngle());
		
		this.deltaX = -1; this.deltaY = 1;
		console.log("[x -1 | y  1]  .< :"    + this.getAngle());
		
		this.deltaX = -1; this.deltaY = 0;
		console.log("[x -1 | y  0]  << :"    + this.getAngle());
		
		this.deltaX = -1; this.deltaY = -1;
		console.log("[x -1 | y -1]  '< :"    + this.getAngle());
		
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
