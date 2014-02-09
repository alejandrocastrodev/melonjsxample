
game.PlayerEntity = me.ObjectEntity.extend({
	

	init : function(x, y, settings) {
		
		settings = settings || {};
		settings.image = "player";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
		settings.width = 32;
		settings.height = 32;
		
		
		// call the constructor
		this.parent(x, y, settings);
		
		
		this.renderable.addAnimation ("0",  [24, 25, 26, 27], 100); 
		this.renderable.addAnimation ("1",  [40, 41, 42, 43], 100);      
		this.renderable.addAnimation ("2",  [46, 47, 48, 49], 100);      
		this.renderable.addAnimation ("3",  [62, 63, 64, 65], 100);      
		this.renderable.addAnimation ("4",  [68, 69, 80, 81], 100);      
		this.renderable.addAnimation ("5",  [84, 85, 86, 87], 100);      
		this.renderable.addAnimation ("6",  [ 2,  3,  4,  5], 100);      
		this.renderable.addAnimation ("7",  [ 8,  9, 20, 21], 100);                        
        this.renderable.setCurrentAnimation("6");

		// set controller for sprite animations
		this.spriteController = new game.SpriteController(this);
		
		// adjust the bounding box
		this.updateColRect(8, 48, -1, 0);

		// set the display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);


	},
	
	setController : function(_controller){
		this.controller = _controller;
		_controller.entity = this;
	},
	
	move : function(_x, _y){
		this.pos.x += _x;
		this.pos.y += _y;
		this.spriteController.notifyEntityPositionChange();
	},
	
	setMovingState : function(){
		console.log("moving");
	},
	
	setQuietState : function(){
		console.log("quiet");
	},

	update : function() {
		this.parent();
		this.controller.update();
		return true;
	},

	draw : function(context) {
		this.parent(context);
		context.fillStyle = 'green';
		context.fillRect(this.pos.x, this.pos.y, 10, 10);
	}
});