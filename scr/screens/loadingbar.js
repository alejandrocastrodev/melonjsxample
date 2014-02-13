game.LoadingBar = Object.extend({
	
	init : function(){
		this.horizontalMargin = 50;
		this.barWidth = me.video.getWidth() - this.horizontalMargin * 2;
		this.rectMargin = 5;
		this.rectAmount = 40;
		this.rectWidth = Math.floor((this.barWidth / this.rectAmount)- this.rectMargin);

		// barWidth is recalculated due to rounding 'rectWidth'
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
	
	initialDraw: function(context) {
		this.currentRectX = this.horizontalMargin;

		this.borderColor = this.color.loadingBorder;
		this.fillColor = this.color.loadingFill;

		this.drawRectanglesUntilPlus(this.rightBorder, context);
		
		//set border color to draw success percent
		this.borderColor = this.color.successBorder;
	},
	
	draw : function(context){
		
		//update
		this.currentRectX = this.horizontalMargin;
		
		// draw the progress bar

		//sets fillColor as new gradient
		this.displaceGradient(context);
		
		this.drawRectanglesUntilPlus(this.percentWidth, context);		
		
	},
	
	//Warning: 'currentRectX' attribute changes
	drawRectanglesUntil : function(maxWith, context){
		context.strokeStyle = this.borderColor;
		context.fillStyle = this.fillColor;
		while (this.currentRectX < maxWith) {
			context.fillRect(this.currentRectX, this.topMargin, this.rectWidth, this.rectHeight);
			context.strokeRect(this.currentRectX, this.topMargin, this.rectWidth, this.rectHeight);
			this.currentRectX += this.rectMargin + this.rectWidth;
		}
	},

	//Warning: 'currentRectX' attribute changes
	drawRectanglesUntilPlus : function(maxWith, context){
		context.strokeStyle = this.borderColor;
		context.fillStyle = this.fillColor;
		context.beginPath();
		while (this.currentRectX < maxWith) {
			context.rect(this.currentRectX, this.topMargin,  this.rectWidth, this.rectHeight);
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
	},
	
	updatePercent : function(progress){
		this.percentWidth = Math.floor(progress * this.barWidth);
	}
	
});