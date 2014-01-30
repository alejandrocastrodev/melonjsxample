//window.onReady(function() {
//	game.onload();
//});

var game = {

	/* an object where to store game global data */
	data : {
		score : 0
	},

	// Run on page load.
	onload : function() {

		// Initialize the video.
		if (!me.video.init("MelonJSxample", 800, 800, true, 'auto')) {
			alert("Your browser does not support HTML5 canvas.");
			return;
		}

		// Initialize the audio.
		me.audio.init("mp3,ogg");

		// Set a callback to run when loading is complete.
		me.loader.onload = this.loaded.bind(this);

		// Load the resources.
		me.loader.preload(game.resources);

		// Initialize melonJS and display a loading screen.
		me.state.change(me.state.LOADING);

	},

	// Run on game resources loaded.
	loaded : function() {
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());

		// add our player entity in the entity pool
		me.entityPool.add("mainPlayer", game.PlayerEntity);

		// Start the game.
		me.state.change(me.state.PLAY);
	}

};

game.PlayScreen = me.ScreenObject.extend({

	cache : {
		counter : 0
	},
	
	// constructor
	init : function() {
		// pass true to the parent constructor
		// as we draw our progress bar in the draw function
		this.parent(true);
	},

	/* action to perform on state change */
	onResetEvent : function() {

		// load a level
		//me.levelDirector.loadLevel("area01");

		// reset the score
		game.data.score = 0;
        console.log(this.bg);
		// add our HUD to the game world
		//this.HUD = new game.HUD.Container();
		//me.game.world.addChild(this.HUD);
		var player = me.entityPool.newInstanceOf('mainPlayer',10, 10, 'left');
		var surface = new game.Background('red');
		
		var entities = new me.ObjectContainer();
		var backgrounds = new me.ObjectContainer();
		
		
		entities.addChild(player);
		//entities.addChild(aim);
		backgrounds.addChild(surface);
		
		me.game.world.addChild(entities);
		me.game.world.addChild(backgrounds);
		me.game.sort();
	},

	draw : function(context) {
		// clear the screen
		if(this.cache.counter < 120){
			me.video.clearSurface.defer(context, "black");
			console.log('dibujando: ' + this.cache.counter ++);
		}
	},

	/* action to perform when leaving this screen (state change) */
	onDestroyEvent : function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
		console.log('destroy');
	},
	
	update : function(dt) {
		dt = dt || 1;
		console.log('actualizando: ' + dt);
		return true;
	}
});

game.Background = me.Renderable.extend({	
	init : function(color){
		this.color = color;
		this.parent({x: 0, y: 0}, 10, 10);
	},

    draw : function(context){
    	me.video.clearSurface(context, this.color);
	},
	
	update: function(){
    	
	}	
});

game.PlayerEntity = me.ObjectEntity.extend({
	/* constructor */
	init : function(x, y, settings) { // TODO wrap no-set settings
		
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.TOP,   "top");
		me.input.bindKey(me.input.KEY.DOWN,  "down");
		me.input.bindKey(me.input.KEY.X,     "jump", true);

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

game.HUD = game.HUD || {};

game.HUD.Container = me.ObjectContainer.extend({

	init : function() {
		// call the constructor
		this.parent();

		// persistent across level change
		this.isPersistent = true;

		// non collidable
		this.collidable = false;

		// make sure our object is always draw first
		this.z = Infinity;

		// give a name
		this.name = "HUD";

		// add our child score object at the top left corner
		this.addChild(new game.HUD.ScoreItem(5, 5));

		console.log('HUD loaded');
	}
});

/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({
	/**
	 * constructor
	 */
	init : function(x, y) {

		// call the parent constructor
		// (size does not matter here)
		this.parent(new me.Vector2d(x, y), 10, 10);

		// local copy of the global score
		this.score = -1;

		// make sure we use screen coordinates
		this.floating = true;
	},

	/**
	 * update function
	 */
	update : function() {
		// we don't do anything fancy here, so just
		// return true if the score has been updated
		if (this.score !== game.data.score) {
			this.score = game.data.score;
			return true;
		}
		return false;
	},

	/**
	 * draw the score
	 */
	draw : function(context) {
		// draw it baby !
	}

});

game.TitleScreen = me.ScreenObject.extend({
	/**
	 * action to perform on state change
	 */
	onResetEvent : function() {
		; // TODO
	},

	/**
	 * action to perform when leaving this screen (state change)
	 */
	onDestroyEvent : function() {
		; // TODO
	}
});