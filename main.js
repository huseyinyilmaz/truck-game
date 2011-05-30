 "strict mode";
// check if a number is even
Number.prototype.isEven=function(){
    return this%2===0;
};
window.game = {
    svgns : "http://www.w3.org/2000/svg",
    ballMiddle : 375,
    balldifference : 150,
    balls:[]
};

window.onload=function(){

    game.svg = document.getElementById('svgContainer');

    var initializeballs = function(balls){
	logger.startLog('initializeballs');
	var length = balls.length;
	if(length.isEven()){
	    var startPoint = game.ballMiddle-(game.balldifference/2)-((length/2)-1)*game.balldifference;
	}else{
	    var startPoint = game.ballMiddle - Math.floor(length/2)*game.balldifference;
	}
	logger.log('startPoint',startPoint);
	for(var i=0;i<length;i++){
	    var circle = game.createBall(startPoint+i*game.balldifference,70,balls[i]);
	    game.balls.push(circle);
	    game.svg.insertBefore(circle.DOM,game.truck.DOM);

	}
	circle.move(440,485,'1s');
	logger.endLog();	
    };
    
    

    //var balls = ['red','green','blue','yellow'];
    var balls = ['red','green','blue','yellow'];
    game.initTruck();
    initializeballs(balls);
    
};