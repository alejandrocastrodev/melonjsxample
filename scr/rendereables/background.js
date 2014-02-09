game.Background = me.Renderable.extend({	
	init : function(color){
		this.color = color || "black";
		this.parent({x: 0, y: 0}, 10, 10);
	},

    draw : function(context){
    	me.video.clearSurface(context, this.color);
	},
	
	update: function(){
    	
	}	
});
