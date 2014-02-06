
game.PlayerEntity = me.ObjectEntity.extend({
	/* constructor */
	init : function(x, y, settings) {
        // TODO wrap set x and y settings
		settings = settings || {};
		settings.image = "player";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
		settings.width = 30;
		settings.height = 50;
		
		this.spriteController = new game.SpriteController(this);
		
		// call the constructor
		this.parent(x, y, settings);
		

		// set the default horizontal & vertical speed (accel vector)
		this.setVelocity(3, 15);
		
		
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