game.ExaMoveController = Object.extend({
	
	init : function(_entity){
		this.entity = _entity;
		this.verticalState = this.states.verticalNowhere;
		this.horizontalState = this.states.horizontalNowhere;
	},
	
	octogonal : 1,
	diagonal : 1.4142, // square root ( 1^2 + 1^2 )
	
	states : {
		verticalUp        : new State(function(){}),
		verticalDown      : new State(function(){}),
		verticalNowhere   : new State(function(){}),
		horizontalLeft    : new state.VerticalNowhere(this),
		horizontalRight   : new state.VerticalNowhere(this),
		horizontalNowhere : new state.VerticalNowhere(this)
	},
	
	updateEntity : function(){
		this.verticalState.updateEntity();
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