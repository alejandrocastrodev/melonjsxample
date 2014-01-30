game.KeyBinder = Object.extend({
	/* constructor */
	
	listener : [],
	//movement : [key , inner-action , opposite-acction , inner-callback, stop-callback]
	movements : ({
			left :  [me.input.KEY.LEFT,  'left',  'right', 'toLeftState',   'verticalStatic'],
			right : [me.input.KEY.RIGHT, 'right', 'left',  'toRighttState', 'verticalStatic'],
			up :    [me.input.KEY.UP,    'up',    'down',  'toUpttState',   'horizontalStatic'],
			down :  [me.input.KEY.DOWN,  'down',  'top',   'toDowntState',  'horizontalStatic']
	}),
	
	init : function() {
		
		this.listener.push(new game.IMoveController());
		
		console.log('keys binded');
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP,    "up");
		me.input.bindKey(me.input.KEY.DOWN,  "down");		
		
		var resume_event = me.event.subscribe(me.event.KEYDOWN, (function (action) {
	        if (action == "left") {
	        	me.event.unsubscribe(resume_event);
	        	if(me.input.isKeyPressed('right')){
	        		
	        	}
	        	this.notify();
	            console.log("left");
	        }
	    }).bind(this));
		
		for(movement in this.movements){
			console.log(movement + ' binded successfully');			
		}
		
		
	},
	
	
	connectKeyCall : function(action, callback){
		
	},
	

    notify : function(callback){
    	this.listener.forEach(function(listener){
    		console.log(listener);
    	});
    }
	
});