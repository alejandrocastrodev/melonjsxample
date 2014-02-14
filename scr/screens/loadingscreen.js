game.LoadingScreen = me.ScreenObject.extend({
	// constructor
	init : function() {
		this.parent(true);
		
		this.loadingBar = new game.LoadingBar();
		this.logo = new game.Logo();
		
		me.loader.onProgress = this.onProgressUpdate.bind(this);
		this.initialDraw(me.video.getScreenContext());
		
	},

	onProgressUpdate : function(progress) {
		this.loadingBar.updatePercent(progress);
	},	

	// display is updated each time due to the gradient
	update : function() {
		return true;
	},

	onDestroyEvent : function() {
		//Do-nothing
	},
		
	//draws only during initialization to increase performance
	initialDraw: function(context) {
		me.video.clearSurface(context, "black");
		this.loadingBar.initialDraw(context);
		this.logo.initialDraw(context);
	},

	draw : function(context) {
		this.loadingBar.draw(context);
	},
});
