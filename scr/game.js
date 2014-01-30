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


