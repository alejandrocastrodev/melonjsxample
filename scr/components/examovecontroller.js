game.ExaMoveController = Object.extend({
	
	init : function(){
		this.entity = {move : function(){ throw "the examovecontroller has no associated entity";}};
		this.controller = this;
		this.verticalState = this.states.verticalNowhere;
		this.horizontalState = this.states.horizontalNowhere;
	},
	
	octogonal : 1,
	diagonal : 0.7071, // x^2 + x^2 = 1^2 ==> square root ( 1/2 )
		
	states : {
		verticalUp        : ({
			update : function(_controller){
				_controller.horizontalState.toUp(_controller);
				}
	    }),
		verticalDown      : ({
			update : function(_controller){
				_controller.horizontalState.toDown(_controller);
				}
	    }),
		verticalNowhere   : ({
			update : function(_controller){
				_controller.horizontalState.toNowhere(_controller);
				}
	    }),
		horizontalLeft    : ({
			toUp      : function(_controller){
				_controller.entity.move(- _controller.diagonal, - _controller.diagonal);
				},
			toDown    : function(_controller){
				_controller.entity.move(- _controller.diagonal, _controller.diagonal);
				},
			toNowhere : function(_controller){
				_controller.entity.move(- _controller.octogonal, 0);
				}
	    }),
		horizontalRight   : ({
			toUp      : function(_controller){
				_controller.entity.move(_controller.diagonal, - _controller.diagonal);
				},
			toDown    : function(_controller){
				_controller.entity.move(_controller.diagonal, _controller.diagonal);
				},
			toNowhere : function(_controller){
				_controller.entity.move(_controller.octogonal, 0);
				}
	    }),
		horizontalNowhere : ({
			toUp      : function(_controller){
				_controller.entity.move(0 , - _controller.octogonal);
				},
			toDown    : function(_controller){
				_controller.entity.move(0 , _controller.octogonal);
				},
			toNowhere : function(_controller){
				//_controller.entity.move(0 , 0);
				}
	    })
	},
	
	update : function(){
		this.verticalState.update(this.controller);
	},
	
	
	toUpState : function(){
		this.verticalState = this.states.verticalUp;
	},
	toDownState : function(){
		this.verticalState = this.states.verticalDown;;
	},
	verticalStatic : function(){
		this.verticalState = this.states.verticalNowhere;
	},
	toLeftState : function(){
		this.horizontalState = this.states.horizontalLeft;
	},
	toRightState : function(){
		this.horizontalState = this.states.horizontalRight;
	},
	horizontalStatic : function(){
		this.horizontalState = this.states.horizontalNowhere;
	}
	
});