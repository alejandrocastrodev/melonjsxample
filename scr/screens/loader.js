// create a custom loading screen
game.CustomLoadingScreen = me.ScreenObject.extend({
	// constructor
	init : function() {
		// pass true to the parent constructor
		// as we draw our progress bar in the draw function
		this.parent(true);
		// a font logo
		this.logo = new me.Font('century gothic', 32, 'white');
		// flag to know if we need to refresh the display
		this.invalidate = false;
		// load progress in percent
		this.loadPercent = 0;
		// setup a callback
		me.loader.onProgress = this.onProgressUpdate.bind(this);
		
		this.loadBar = new game.LoadBar();

		// clears the screen an only time
		me.video.clearSurface(me.video.getScreenContext(), "black");

		

	},

	onProgressUpdate : function(progress) {
		this.loadBar.loadPercent = progress;
	},	

	// display is updated each time due to the gradient
	update : function() {
		return true;
	},

	onDestroyEvent : function() {
		this.logo = null;
	},

	// draw function
	draw : function(context) {

		// measure the logo size
		//logo_width = this.logo.measureText(context,	"awesome loading screen").width;

		// draw our text somewhere in the middle
		// this.logo.draw(context,
		// "awesome loading screen",
		// ((me.video.getWidth() - logo_width) / 2),
		// (me.video.getHeight() + 60) / 2);

		// display a progressive loading bar
		// TODO extract in contructor
		
		
		this.loadBar.draw(context);

	},
});

game.LoadBar = Object.extend({
	
	init : function(){
		this.horizontalMargin = 50;
		this.barWidth = me.video.getWidth() - this.horizontalMargin * 2;
		this.rectMargin = 5;
		this.rectAmount = 40;
		this.rectWidth = Math.floor((this.barWidth / this.rectAmount)- this.rectMargin);

		// barWidth is recalculated due to rounding rectWidth
		this.barWidth = this.rectAmount * this.rectWidth + (this.rectAmount - 1) * this.rectMargin;
		this.horizontalMargin = (me.video.getWidth() - this.barWidth) / 2;

		this.rectHeight = this.rectWidth * 2;
		this.topMargin = me.video.getHeight() - 42;

		this.rightBorder = this.barWidth + this.horizontalMargin;
		
		this.color = {
				successBorder  : "#0F0",
				successFill    : "#050",
				successGradient: "#0F0",
				loadingBorder  : "#F00",
				loadingFill    : "#500",				
		};

		//the gradient width in pixels
		this.gradientWidthInPixels = 30;
		
		//the gradient displacement index
		//it is abstract
		this.gradientSpeed = 0.01;
		
		//represents the width of the gradient outside the canvas
		//to hide the canvas to start the animation
		this.ofsetCanvasGradient = this.gradientWidthInPixels - this.horizontalMargin;
		
		//the gradient width in percent
		this.gradientWidth = this.gradientWidthInPixels / (this.ofsetCanvasGradient * 2 + me.video.getWidth());
		
		this.gradientCenter = this.gradientWidth;
		this.gradientMax = (1 - this.gradientWidth);
		
	},
	
	draw : function(context){
		
		//update
		this.percentWidth = Math.floor(this.loadPercent * this.barWidth);
		this.currentRectX = this.horizontalMargin;
		
		// draw the progress bar
		this.borderColor = this.color.successBorder;

		this.displaceGradient(context);
		
		this.drawRectanglesUntilPlus(this.percentWidth, context);

		this.borderColor = this.color.loadingBorder;		
		this.fillColor = this.color.loadingFill;

		this.drawRectanglesUntilPlus(this.rightBorder, context);
		
		
	},
	
	drawRectanglesUntil : function(maxWith, context){
		
		while (this.currentRectX < maxWith) {
			context.fillStyle = this.borderColor;
			context.fillRect(this.currentRectX - 1, this.topMargin - 1,
					this.rectWidth + 2, this.rectHeight + 2);
			context.fillStyle = this.fillColor;
			context.fillRect(this.currentRectX, this.topMargin,
					this.rectWidth, this.rectHeight);

			this.currentRectX += this.rectMargin + this.rectWidth;
		}
	},
	
	drawRectanglesUntilPlus : function(maxWith, context){
		context.strokeStyle = this.borderColor;
		context.fillStyle = this.fillColor;
		context.beginPath();
		while (this.currentRectX < maxWith) {
			context.moveTo(this.currentRectX, this.topMargin);
			context.lineTo(this.currentRectX, this.topMargin + this.rectHeight);
			context.lineTo(this.currentRectX + this.rectWidth, this.topMargin + this.rectHeight);
			context.lineTo(this.currentRectX + this.rectWidth, this.topMargin);			
			context.lineTo(this.currentRectX, this.topMargin);
			
			this.currentRectX += this.rectMargin + this.rectWidth;
		}
		context.closePath();
		
		context.fill();
		context.stroke();
		
	},
	
	displaceGradient : function(context){		
		this.gradientCenter += this.gradientSpeed;
		if(this.gradientCenter > this.gradientMax){
			this.gradientCenter = this.gradientWidth;
		}		
		this.fillColor = context.createLinearGradient( - this.ofsetCanvasGradient, 0, me.video.getWidth() + this.ofsetCanvasGradient, 0);
		this.fillColor.addColorStop(this.gradientCenter - this.gradientWidth, this.color.successFill);
		this.fillColor.addColorStop(this.gradientCenter                     , this.color.successGradient);
		this.fillColor.addColorStop(this.gradientCenter + this.gradientWidth, this.color.successFill);
	}
	
});