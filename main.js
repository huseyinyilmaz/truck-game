 "strict mode";
// check if a number is even
Number.prototype.isEven=function(){
    return this%2===0;
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
	var that=this;
	$(configLink).click(function(){that.openConfig();});
    },
    startGame:function(){
	this.instance = {
	    "color":this.currentColor==="random"?this.colors[Math.floor(Math.random()*this.colors.length)]:this.currentColor,
	    "count":this.ballCount
	};
	this.truck.moveToMiddle();
	this.startBalls();
	
    },
    clearGame:function(){
	
    },
    removeAllEvents:function(){
	this.balls.forEach(function(item){
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