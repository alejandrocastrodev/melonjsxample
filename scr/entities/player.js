
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
		
		var sprite, frame;
		
		for(sprite = 0; sprite < 8; sprite ++){
			frame = sprite*10;
			this.renderable.addAnimation (sprite + "-stop-kind",   this.range(frame    , 1), 100);
			this.renderable.addAnimation (sprite + "-stop-shoot",  this.range(frame    , 2), 100);			
			this.renderable.addAnimation (sprite + "-move-kind",   this.range(frame + 2, 4), 100);
			this.renderable.addAnimation (sprite + "-move-shoot",  this.range(frame + 6, 4), 100);
		}
		
		

		this.direction = 0; // 0-7
		this.moving = "stop"; // move
		this.shooting = "kind"; // shoot
		
		this.updateState();			

		// set controller for sprite animations
		this.spriteController = new game.DirectionSpriteController(this);
		new game.ShootingSpriteController(this);
		
		// adjust the bounding box
		this.updateColRect(8, 48, -1, 0);

		// set the display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);


	},
	
	range : function (start, amount) {
	    var nrange = new Array(amount);
	    for (var i = 0; i < amount; i++) {
	    	nrange[i] = i + start;
	    }
	    return nrange;
	    
	},
	
	updateState : function(){
		this.state = this.direction + "-" + this.moving +  "-" + this.shooting;
        this.renderable.setCurrentAnimation(this.state);		
	},
	
	startShooting : function(){
		this.shooting = "shoot";
		this.updateState();
	},
	
	stopShooting : function(){
		this.shooting = "kind";
		this.updateState();
	},
	
	setMoveController : function(_moveController){
		this.moveController = _moveController;
		_moveController.entity = this;
	},
	
	move : function(_x, _y){
		this.pos.x += _x;
		this.pos.y += _y;
		this.spriteController.notifyEntityPositionChange();
	},
	
	setDirection : function(_direction){
		this.direction = _direction;
		this.updateState();
	},
	
	setMovingState : function(){
		this.moving = "move";
		this.updateState();
	},
	
	setQuietState : function(){
		this.moving = "stop";
		this.updateState();
	},

	update : function() {
		this.parent();
		this.moveController.update();
		return true;
	},

	draw : function(context) {
		this.parent(context);
		context.fillStyle = 'green';
		context.fillRect(this.pos.x, this.pos.y, 10, 10);
	}
});