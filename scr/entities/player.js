
game.PlayerEntity = me.ObjectEntity.extend({
	/* constructor */
	init : function(x, y, settings) {
        // TODO wrap no-set settings
		
		// call the constructor
		this.parent(x, y, {
			width : 30,
			height : 50
		});

		// set the default horizontal & vertical speed (accel vector)
		this.setVelocity(3, 15);

		// adjust the bounding box
		this.updateColRect(8, 48, -1, 0);

		// set the display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		console.log('player init');

	},

	/* update the player pos */
	update : function() {
		if (me.input.isKeyPressed('left')){
		  this.pos.x --;
		}
		if (me.input.isKeyPressed('right')){
			  this.pos.x ++;
		}
		return true;
	},

	draw : function(context) {
		context.fillStyle = 'green';
		context.fillRect(this.pos.x, this.pos.y, 10, 10);
		// clear the screen
		//me.video.clearSurface(context, "black");
		//console.log('dibujando');
	}
});