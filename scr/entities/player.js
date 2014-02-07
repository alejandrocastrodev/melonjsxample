
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
		
		// set controller for sprite animations
		this.spriteController = new game.SpriteController(this);

		// set the default horizontal & vertical speed (accel vector)
		//this.setVelocity(3, 15);
		
		
		this.renderable.addAnimation ("default",  [2, 3, 4, 5], 100);                   
        this.renderable.setCurrentAnimation("default");

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
		//console.log(this.pos.x + ' - ' + this.pos.y + ' - ' + this.pos.z);
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