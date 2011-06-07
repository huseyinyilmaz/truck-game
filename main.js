 "strict mode";
// check if a number is even
Number.prototype.isEven=function(){
    return this%2===0;
};

Array.prototype.contains = function(item){
    return this.some(function(i){return i === item;});
};

Array.prototype.shuffle = function(){
    for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
};

window.game = {
    svgns : "http://www.w3.org/2000/svg",
    ballMiddle : 375,
    balldifference : 150,
    balls:[],
    colors:['red','green','blue','yellow'],
    applyConfig:function(color,count){
	this.currentColor = color;
	this.ballCount=count;
    },
    initConfig:function(element){
	var that = this;//for dialog onClick event
	this.configDialog = $(element).dialog({ autoOpen: false,
						title: 'Game Configuration',
						buttons:{save:function(){
							     that.applyConfig();
							     game.configDialog.dialog('close');
							     alert('apply Changes');}},
            		    closeOnEscape:true,
      			    modal:true
			    });
    },
    openConfig:function(){
	game.configDialog.dialog('open');
    },
    init:function(svg,dialog,configLink){
	this.svg = svg;
	this.applyConfig('random',4);
	this.initConfig(dialog);
	this.initTruck();
	this.initBalls(this.colors);
	// Add config link event.
	$(configLink).click(function(){this.openConfig();}.bind(this));
    },
    startGame:function(){
	logger.startLog('game.startGame');
	//clear old game data
	this.clearGame();
	// Initialize current variables
	var ballCount = this.ballCount;
	var colors = this.colors;
	var currentColor = this.currentColor;
	var currentColors = [];
	//if currentColor is not random, add chosen color to list
	if(currentColor!== 'random'){
	    logger.log('Color is preset. ' + this.currentColor + ' was added to array.');
	    currentColors.push(this.currentColor);
	    ballCount -= 1;
	}
	//fill rest of the ball list with random colors
	while(currentColors.length<ballCount){
	    var choosenColor = colors[Math.floor(Math.random()*colors.length)];
	    logger.log(choosenColor + ' is selected as candidate');
	    if(!currentColors.contains(choosenColor)){
		currentColors.push(choosenColor);
		logger.log(choosenColor + ' was added to current ball list.');
	    }
	}

	var currentBalls = this.initBalls(currentColors.shuffle());

	this.instance = {
	    "color":this.currentColor==="random"?this.colors[Math.floor(Math.random()*this.colors.length)]:currentColor,
	    "count":this.ballCount,
	    "currentBalls":currentBalls
	};
	this.startBalls();
	this.truck.moveToMiddle();
	logger.endLog();
	
    },
    clearGame:function(){
	if(typeof this.instance !=="undefined"){
	    var svg = this.svg;
	    this.instance.currentBalls.forEach(function(item){
						   svg.removeChild(item.DOM);
					       });

	    };
    },
    removeAllEvents:function(){
	this.instance.currentBalls.forEach(function(item){
			       item.removeClickHandler();
			   });
    }
};
			 


window.onload=function(){
    game.init(document.getElementById('svgContainer'),
	      document.getElementById('configDialog'),
	      document.getElementById('configLink'));

    game.startGame();
};