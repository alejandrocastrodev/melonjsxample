


game.ShootingSpriteController = Object.extend({
	

	init : function(_entity) {
		this.entity = _entity;
			
		this.bindMouseMove();
	},

	bindMouseMove : function() {
		me.input.registerPointerEvent('mousedown', me.game.viewport,
				this.mousedown.bind(this));
		me.input.registerPointerEvent('mouseup', me.game.viewport,
				this.mouseup.bind(this));
	},
	
	mousedown : function(e){
		if(e.button == 0){
			this.entity.startShooting();
		}
	},
	
	mouseup : function(e){
		if(e.button == 0){
			this.entity.stopShooting();
		}
	},

	
	

});
