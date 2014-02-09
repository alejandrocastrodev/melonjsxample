game.ExaMoveController = Object.extend({

	init : function(){
		//set fake entity to inform in case it has not been set
		this.entity = {move : function(){ throw "the examovecontroller has no associated entity";}};
		
		this.generateStates();
		this.verticalState = this.states.verticalNowhere;
		this.horizontalState = this.states.horizontalNowhere;
	},
	
	octogonal : 1,
	diagonal : 0.7071, // x^2 + x^2 = 1^2 ==> square root ( 1/2 )
	
	generateStates : function(){
		this.states = {};
		this.states.verticalUp         = new game.verticalUp(this);
		this.states.verticalDown       = new game.verticalDown(this);
		this.states.verticalNowhere    = new game.verticalNowhere(this);
		this.states.horizontalLeft     = new game.horizontalLeft(this);
		this.states.horizontalRight    = new game.horizontalRight(this);
		this.states.horizontalNowhere  = new game.horizontalNowhere(this);
	},
	
	update : function(){
		this.verticalState.update();
	},
	
	
	toUpState : function(){
		this.verticalState = this.states.verticalUp;
		this.entity.setMovingState();
	},
	toDownState : function(){
		this.verticalState = this.states.verticalDown;;
		this.entity.setMovingState();
	},
	verticalStatic : function(){
		this.verticalState = this.states.verticalNowhere;
		this.horizontalState.notifyMovementState();
	},
	toLeftState : function(){
		this.horizontalState = this.states.horizontalLeft;
		this.entity.setMovingState();
	},
	toRightState : function(){
		this.horizontalState = this.states.horizontalRight;
		this.entity.setMovingState();
	},
	horizontalStatic : function(){
		this.horizontalState = this.states.horizontalNowhere;
		this.verticalState.notifyMovementState();
	}
	
});

//superclass for movement states
//default notifyMovementState behaviour
game.MoveState = Object.extend({
	init : function(_moveController){
		this.moveController = _moveController;
	},
	notifyMovementState : function(){
		this.moveController.entity.setMovingState();
	}
});

//all the states
game.verticalUp  = game.MoveState.extend({
	update : function(){
		this.moveController.horizontalState.toUp();
		}
});

game.verticalDown  = game.MoveState.extend({
	update : function(){
		this.moveController.horizontalState.toDown();
		}
});

game.verticalNowhere  = game.MoveState.extend({
	update : function(){
		this.moveController.horizontalState.toNowhere();
		},
	notifyMovementState : function(){
		this.moveController.entity.setQuietState();
	}
});

game.horizontalLeft = game.MoveState.extend({
	toUp      : function(){
		this.moveController.entity.move(- this.moveController.diagonal, - this.moveController.diagonal);
		},
	toDown    : function(){
		this.moveController.entity.move(- this.moveController.diagonal, this.moveController.diagonal);
		},
	toNowhere : function(){
		this.moveController.entity.move(- this.moveController.octogonal, 0);
		}
});

game.horizontalRight = game.MoveState.extend({
	toUp      : function(){
		this.moveController.entity.move(this.moveController.diagonal, - this.moveController.diagonal);
		},
	toDown    : function(){
		this.moveController.entity.move(this.moveController.diagonal, this.moveController.diagonal);
		},
	toNowhere : function(){
		this.moveController.entity.move(this.moveController.octogonal, 0);
		}
});


game.horizontalNowhere = game.MoveState.extend({
	toUp      : function(){
		this.moveController.entity.move(0 , - this.moveController.octogonal);
		},
	toDown    : function(){
		this.moveController.entity.move(0 , this.moveController.octogonal);
		},
	toNowhere : function(){
		//this.moveController.entity.move(0 , 0);
		},
   
	notifyMovementState : function(){
		this.moveController.entity.setQuietState();
	}
});
