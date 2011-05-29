 "strict mode";
Number.prototype.isEven=function(){
    return this%2===0;
}
window.svgns = "http://www.w3.org/2000/svg";
window.onload=function(){

    var svg = document.getElementById('svgContainer');
    
    var ballMiddle = 375;
    var balldifference = 150;

    var createCircle = function(x,y,color){
	logger.startLog('createCircle');
	logger.log('cx',x);
	logger.log('cy',y);
	logger.log('color',color);
	var circle = document.createElementNS(svgns,'circle');
	circle.setAttributeNS(null,'cx',x);
	circle.setAttributeNS(null,'cy',y);
	circle.setAttributeNS(null,'r',50);
	circle.setAttributeNS(null,'fill',color);
	circle.setAttributeNS(null,'stroke','black');
	circle.setAttributeNS(null,'stroke-with','1px');
	circle.setAttributeNS(null,'stroke-linecap','butt');
	circle.setAttributeNS(null,'stroke-linejoint','miter');
	circle.setAttributeNS(null,'stroke-opacity','1');
	logger.endLog();
	return circle;
    };

    var initializeballs = function(balls){
	logger.startLog('initializeballs');
	var length = balls.length;
	if(length.isEven()){
	    var startPoint = ballMiddle-(balldifference/2)-((length/2)-1)*balldifference;
	}else{
	    var startPoint = ballMiddle - Math.floor(length/2)*balldifference;
	}
	logger.log('startPoint',startPoint);
	for(var i=0;i<length;i++){
	    var circle = createCircle(startPoint+i*balldifference,70,balls[i]);
	    svg.appendChild(circle);
	}
	logger.endLog();	
    };
    
    

    //var balls = ['red','green','blue','yellow'];
    var balls = ['red','green','blue','yellow'];

    initializeballs(balls);
    
    // var circle = createCircle(150,70,'#ff0000');
    // svg.appendChild(circle);
    // circle = createCircle(300,70,'#00ff00');
    // svg.appendChild(circle);
    // circle = createCircle(450,70,'#0000ff');
    // svg.appendChild(circle);
    // circle = createCircle(600,70,'#ffff00');
    // svg.appendChild(circle);

};