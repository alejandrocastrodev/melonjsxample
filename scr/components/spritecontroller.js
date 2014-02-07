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
	},

	bindMouseMove : function() {
		me.input.registerPointerEvent('mousemove', me.game.viewport,
				this.updateSprite.bind(this));
	},

	updateSprite : function(e) {
		this.angle = 0.0;
		this.dIndex = 6;
		
		
		this.deltaX = e.gameScreenX - this.entity.pos.x - this.middleWidth;
		this.deltaY = e.gameScreenY - this.entity.pos.y - this.middleHeight;
		
		
		
		
		this.angle = - Math.atan(this.deltaY / this.deltaX);

		console.log("deltaX:" + this.deltaX);
		console.log("deltaY:" + this.deltaY);
		console.log("angle:" + this.angle);
	},

	fixSintax : 1,

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
