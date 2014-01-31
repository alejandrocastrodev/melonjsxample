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
		// add our HUD to the game world
		//this.HUD = new game.HUD.Container();
		//me.game.world.addChild(this.HUD);
		var player = me.entityPool.newInstanceOf('mainPlayer',10, 10);
		

		var keybinder = new game.KeyBinder();
		keybinder.addListener(new game.IMoveController());
        
		var surface = new game.Background('black');
		
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
			//console.log('dibujando: ' + this.cache.counter ++);
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
		//console.log('actualizando: ' + dt);
		return true;
	}
});
