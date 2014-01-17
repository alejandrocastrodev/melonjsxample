/* game namespace */

window.onReady(function() {
	    game.onload();
	 });

var game = {
 
    /**
     * an object where to store game global data
     */
    data : {
        // score
        score : 0
    },
     
    // Run on page load.
    onload : function () {
        // Initialize the video.
        if (!me.video.init("MelonJSxample", 640, 480, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
         
        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(debugPanel, "debug");
            });
        }
 
        // Initialize the audio.
        //me.audio.init("mp3,ogg");
 
        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);
      
        // Load the resources.
        me.loader.preload(game.resources);
 
        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },
 
 //game resources
   resources : {
    /**
     * Graphics.
     */
    // our level tileset
    //{name: "area01_level_tiles",  type:"image", src: "data/img/map/area01_level_tiles.png"},
     
    /*
     * Maps.
     */
    //{name: "area01", type: "tmx", src: "data/map/area01.tmx"}
 
   },
 
    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
 
        // Start the game.
        me.state.change(me.state.PLAY);
    }
};
