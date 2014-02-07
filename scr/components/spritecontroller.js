// constant values to increase performance
const PID4 = Math.PI / 4;
const PID8 = Math.PI / 8;

game.SpriteController = Object.extend({
	
	//this object can handle sprites according to the angle between the entity and the mouse
	//needs to be notified when an entity changes position through 'notifyEntityPositionChange'

	init : function(_entity) {
		this.entity = _entity;
		
		this.middleWidth = _entity.width / 2;
		this.middleHeight = _entity.height / 2;

		this.lastDirectionIndex = 0;
		this.directionIndex = 0;
		this.angle = 0.0;
		
		this.bindMouseMove();
	},

	bindMouseMove : function() {
		me.input.registerPointerEvent('mousemove', me.game.viewport,
				this.updateSprite.bind(this));
	},
	
	notifyEntityPositionChange : function(){
		//invokes updateSprite simulating a mouse event
		var offset = me.game.viewport.localToWorld(0,0);
		this.updateSprite({
			gameWorldX: me.input.mouse.pos.x + offset.x,
			gameWorldY: me.input.mouse.pos.y + offset.y
		});
	},

	updateSprite : function(e) {
		
		//set 'x' and 'y' delta between mouse and player's center
		this.deltaX = e.gameWorldX - this.entity.pos.x - this.middleWidth;		
		this.deltaY = e.gameWorldY - this.entity.pos.y - this.middleHeight;
		
		this.updateDirectionIndex();

		if(this.lastDirectionIndex != this.directionIndex){
			this.lastDirectionIndex = this.directionIndex;
			this.entity.renderable.setCurrentAnimation(this.directionIndex);
			//console.log("set" + this.directionIndex);
			
		}
		
	},
	
	updateDirectionIndex : function(){	
		
		//set 'directionIndex' according to the angle between the entity and the mouse
		//0 corresponds to the right position and increases the sense of clockwise
		
		this.angle = Math.atan2(this.deltaY , this.deltaX);
		
		//add PID8 to rotate 22.5°
		this.directionIndex = Math.floor((this.angle + PID8) / (PID4));
		
		//directionIndex modulus 8
		if(this.directionIndex < 0) this.directionIndex += 8;		
	}
	
	

});
