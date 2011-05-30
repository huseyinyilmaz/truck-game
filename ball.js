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
	    }else{
		var xanimation = this.animations.xanimation,
      		    yanimation = this.animations.yanimation;
		
		xanimation.setAttributeNS(null,'to',x);
		xanimation.setAttributeNS(null,'dur',duration);
		yanimation.setAttributeNS(null,'to',y);
		yanimation.setAttributeNS(null,'dur',duration);

		xanimation.beginElement();
		yanimation.beginElement();
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
	}
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

	var ball = {
	    DOM:circle,
	    animations:{
		'xanimation':xanimation,
		'yanimation':yanimation},
	    x:x,
	    y:y,
	    isVisible:true,
	    color:color
	};
	ball.__proto__=ballProto;
	return ball;
    };

}());