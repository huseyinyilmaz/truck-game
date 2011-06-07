"strict mode";
game.createBall = (function(){
    //creates a circle and animations elements
    var createCircle = function(x,y,color){
	logger.startLog('createCircle');
	logger.log('cx',x);
	logger.log('cy',y);
	logger.log('color',color);

	logger.endLog();
	return {
	    'circle':circle,
	    'xanimation':xanimation,
	    'yanimation':yanimation
	};
    };
    


    var ballProto={
	move:function(x,y,duration){
	    logger.startLog('ballProto.move');
	    if(typeof duration === 'undefined'){
		this.DOM.setAttributeNS(null,'cx',x);
		this.DOM.setAttributeNS(null,'cy',y);
		logger.log('ball moved to ' + x +','+y);
	    }else{
		var xanimation = this.animations.xanimation,
      		    yanimation = this.animations.yanimation;
		
		xanimation.setAttributeNS(null,'to',x);
		xanimation.setAttributeNS(null,'dur',duration);
		yanimation.setAttributeNS(null,'to',y);
		yanimation.setAttributeNS(null,'dur',duration);

		xanimation.beginElement();
		yanimation.beginElement();
		logger.log('start animation with ' + x +','+y+' in ' + duration);

	    };
	    this.x = x;
	    this.y = y;
	    logger.endLog();
	},
	setVisible:function(isVisible){
	    logger.startLog('ballProto.setVisible');
	    logger.log('isVisible',isVisible);
	    this.isVisible = isVisible;
	    this.DOM.setAttributeNS(null,'opacity',isVisible?'1':'0');
	    logger.endLog();
	},
	addClickHandler:function(){
	    this.DOM.addEventListener('click',this.clickHandler,false);
	},
	removeClickHandler:function(){
	    this.DOM.removeEventListener('click',this.clickHandler,false);
	},

	defaultBallLocation:{x:440,y:485}
	
	
    };

    return function(x,y,color){
	var circle = document.createElementNS(this.svgns,'circle');
	circle.setAttributeNS(null,'cx',x);
	circle.setAttributeNS(null,'cy',y);
	circle.setAttributeNS(null,'r',50);
	circle.setAttributeNS(null,'fill',color);
	circle.setAttributeNS(null,'stroke','black');
	circle.setAttributeNS(null,'stroke-with','1px');
	circle.setAttributeNS(null,'stroke-linecap','butt');
	circle.setAttributeNS(null,'stroke-linejoint','miter');
	circle.setAttributeNS(null,'stroke-opacity','1');
	circle.setAttributeNS(null,'opacity','1');

	//animation for x
	var xanimation = document.createElementNS(this.svgns,'animate');
	xanimation.setAttributeNS(null,'attributeType','XML');
	xanimation.setAttributeNS(null,'attributeName','cx');
	xanimation.setAttributeNS(null,'to',x);
	xanimation.setAttributeNS(null, 'begin', 'indefinite');	
	xanimation.setAttributeNS(null,'dur','1s');
	xanimation.setAttributeNS(null,'fill','freeze');

	// animation for y
	var yanimation = document.createElementNS(this.svgns,'animate');
	yanimation.setAttributeNS(null,'attributeType','XML');
	yanimation.setAttributeNS(null,'attributeName','cy');
	yanimation.setAttributeNS(null,'to',y);
	yanimation.setAttributeNS(null, 'begin', 'indefinite');
	yanimation.setAttributeNS(null,'dur','1s');
	yanimation.setAttributeNS(null,'fill','freeze');
	circle.appendChild(xanimation);
	circle.appendChild(yanimation);

	var ball = Object.create(
	    ballProto,
	    {
		DOM:{value:circle},
		animations:{value:{xanimation:xanimation,yanimation:yanimation}},
		x:{value:x},
		y:{value:y},
		isVisible:{value:true},
		color:{value:color}
	    }
	);
	var game = this;
	//add endEvent to Y animation
	yanimation.addEventListener('endEvent',function(){game.ballClicked(this);}.bind(ball),false);

	return ball;
    };

}());

game.initBalls = function(colors){
    logger.startLog('game.initBalls');
    var balls = [];
    colors.forEach(function(item){
		       //create a new Ball
		       var ball = this.createBall(-100,-100,item),
		           game = this;
		       balls.push(ball);
		       this.svg.insertBefore(ball.DOM,this.truck.DOM);
		      
		       ball.clickHandler = function(){
			   this.removeClickHandler();
			   this.move(440,485,'1s');
			   game.removeAllEvents();
//			   game.ballClicked(this);
		       }.bind(ball);
		   }.bind(this));

    logger.endLog();
    return balls;
};
    
game.startBalls = function(){
    logger.startLog('startBalls');
    var balls = this.instance.currentBalls,
        length = balls.length;
    
    if(length.isEven()){
	var startPoint = this.ballMiddle-(this.balldifference/2)-((length/2)-1)*this.balldifference;
    }else{
	var startPoint = this.ballMiddle - Math.floor(length/2)*this.balldifference;
    }

    logger.log('startPoint',startPoint);
    balls.forEach(function(item,index){
		      logger.log(index);
		      item.move(startPoint+index*this.balldifference,70);
		      item.addClickHandler();
		  }.bind(this));
	
    logger.endLog();
};    

game.ballClicked = function(ball){
    if(ball.color === this.instance.color){
	alert('game complete');
	ball.setVisible(true);
	this.startGame();
    }else{
	alert('wrong ball');
	this.startBalls();
    }
    
};
