window.onReady(function() {
  game.onload();
});


var game = {
 
    /* an object where to store game global data */
    data : {
        score : 0
    },
     
    // Run on page load.
    onload : function () {        
        
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
    loaded : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        
        // add our player entity in the entity pool
        me.entityPool.add("mainPlayer", game.PlayerEntity);
        
        // Start the game. 
        me.state.change(me.state.PLAY);
        
    }
    
    
};


game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() { 
     
        // load a level
        me.levelDirector.loadLevel("area01");
        
        // reset the score
        game.data.score = 0;
        
        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
        me.game.world.addChild( me.entityPool.newInstanceOf("mainPlayer"));       
    },     
     
    /* action to perform when leaving this screen (state change) */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
        
		console.log('destroy');
    }
});

game.PlayerEntity = me.ObjectEntity.extend(
{
  
    /* constructor */
	
	init:function (x, y, settings)
	{
		// call the constructor
		
		//TODO wrap no-set settings
		
		this.parent(x, y , {width: 30, height: 50});
		
		// set the default horizontal & vertical speed (accel vector)
		this.setVelocity(3, 15);
	 
		// adjust the bounding box
		this.updateColRect(8,48, -1,0);
		
		// set the display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
		console.log('player init');
		
	},

	/* update the player pos */		
	update : function (){
		
		console.log('update');
		return true;
		
	},
	
	draw : function(context){
		
	}
});

game.HUD = game.HUD || {};

 
game.HUD.Container = me.ObjectContainer.extend({

	init: function() {
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
	init: function(x, y) {
		
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
	update : function () {
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
	draw : function (context) {
		// draw it baby !
	}

});

game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
      ; // TODO
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	  ; // TODO
	}
});