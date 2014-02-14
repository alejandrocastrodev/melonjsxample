game.Logo = Object.extend({
	
	//generate the application logo
	//orginal width = 6732
	//orginal hight = 6696
	
	init: function(scale){
		this.scale = scale || 0.06;
		this.width = 6732;
		this.height = 6696;
		
		this.gradientX = this.width/2;
		this.gradientY = this.height/2;
		
		//calculated top and left margin to center the logo on the screen
		//multiplied by the scale due to scaling during drawing
		this.y = (( me.video.getHeight() / this.scale ) - this.height ) / 2;
		this.x = (( me.video.getWidth() / this.scale ) - this.width ) / 2;
		
		
	},
	
	//thanks www.professorcloud.com/svg-to-canvas
	initialDraw : function(ctx){
        
		
		ctx.save();
		
		ctx.scale(this.scale ,this.scale);
		ctx.translate(this.x, this.y);

		var gradient = ctx.createRadialGradient(
				this.gradientX,
				this.gradientY,
				0,
				this.gradientX,
				this.gradientY,
				(this.gradientX + this.gradientY ) * 2
		);
		gradient.addColorStop(0,"#A00");
		gradient.addColorStop(1,"#400");
		
		ctx.fillStyle = gradient;
		
		ctx.beginPath();
		
		ctx.moveTo(3216, 1415);
		ctx.lineTo(4630, 2829);
		ctx.lineTo(3923, 3536);
		ctx.lineTo(3499, 3112);
		ctx.lineTo(3782, 2829);
		ctx.lineTo(3216, 2263);
		ctx.lineTo(2650, 2829);
		ctx.lineTo(2934, 3113);
		ctx.lineTo(2510, 3537);
		ctx.lineTo(1802, 2829);
		ctx.lineTo(3216, 1415);
		
		ctx.closePath();
		
		ctx.moveTo( 401,  406);
		ctx.lineTo(2805,    5);
		ctx.lineTo(   0, 2810);
		ctx.lineTo( 401,  406);
		
		ctx.closePath();
		
		ctx.moveTo( 947, 4417);
		ctx.lineTo(3230, 6053);
		ctx.lineTo(5486, 4436);
		ctx.lineTo(3226, 6696);
		ctx.lineTo( 947, 4417);
		
		ctx.closePath();
		
		ctx.moveTo(3535,    5);
		ctx.lineTo(6732,    5);
		ctx.lineTo(6732, 3240);
		ctx.lineTo(6275,  468);
		ctx.lineTo(3536,    5);
		
		ctx.closePath();
		
		ctx.moveTo(4070,  411);
		ctx.lineTo(6009,  734);
		ctx.lineTo(6332, 2673);
		ctx.lineTo(4069,  410);
		
		ctx.closePath();
		
		ctx.moveTo(3217,    0);
		ctx.lineTo(3712,  495);
		ctx.lineTo(1379, 2828);
		ctx.lineTo(3217, 4666);
		ctx.lineTo(5055, 2828);
		ctx.lineTo(3840, 1613);
		ctx.lineTo(4335, 1118);
		ctx.lineTo(6045, 2828);
		ctx.lineTo(3217, 5656);
		ctx.lineTo( 389, 2828);
		ctx.lineTo(3217,    0);
		
		ctx.closePath();
		
		ctx.fill();
		
		ctx.restore();
	}
});