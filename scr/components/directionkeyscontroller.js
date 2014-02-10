game.DirectionKeysController = Object.extend({
		
	init : function() {
		
		this.movements = {
		    //movement : action [opposite , innercall, stopcall, keys]
			left  : this.build('right', 'toLeftState',  'horizontalStatic',   [me.input.KEY.LEFT , me.input.KEY.A]),
			right : this.build('left',  'toRightState', 'horizontalStatic',   [me.input.KEY.RIGHT, me.input.KEY.D]),
			up    : this.build('down',  'toUpState',    'verticalStatic',     [me.input.KEY.UP   , me.input.KEY.W]),
			down  : this.build('up',    'toDownState',  'verticalStatic',     [me.input.KEY.DOWN , me.input.KEY.S])
	    };

		this.listeners = [];
				
		for(movement in this.movements){
			this.bindKeys(movement, this.movements[movement].keys);
			this.subscribeDownKey(movement, this.movements[movement]);
		}
	},
	
	addListener : function(listener){
		this.listeners.push(listener);		
	},
		
	bindKeys : function(action, keys){
		keys.forEach(function(key){
			me.input.bindKey(key,  action);
		});
	},	
	
	//TODO avoid 'bind' for increase de performance
	
	subscribeDownKey : function(action, movement){
		var suscription = me.event.subscribe(me.event.KEYDOWN, (function (sys_action) {
	        if (sys_action == action) {
	        	me.event.unsubscribe(suscription);
	        	this.subscribeUpKey(action, movement);
	        	this.notify(movement.innercall);
	        }
	    }).bind(this));
	},
	
	subscribeUpKey : function(action, movement){
		var suscription = me.event.subscribe(me.event.KEYUP, (function (sys_action) {
	        if (sys_action == action) {
	        	me.event.unsubscribe(suscription);
	        	this.subscribeDownKey(action, movement);
	        	if(me.input.isKeyPressed(movement.opposite)){
	        		this.notify(this.movements[movement.opposite].innercall);		
	        	}
	        	else{
	        		this.notify(movement.stopcall);
	        	}
	        }
	    }).bind(this));
	},

    notify : function(callback){
    	this.listeners.forEach(function(listener){
    		listener[callback]();
    	});
    },
	
	build : function(_opposite, _innercall, _stopcall, _keys){
		return {
			opposite: _opposite, 
			innercall: _innercall, 
			stopcall: _stopcall,
			keys: _keys
		};
	}
	
});


