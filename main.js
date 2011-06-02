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
    }
};
			 


window.onload=function(){
    game.svg = document.getElementById('svgContainer');
    var balls = ['red','green','blue','yellow'];
    game.initTruck();
    game.initializeballs(balls);
    game.truck.move(600,0,'3s');
    var configDialogElement = document.getElementById('configDialog');
    game.initConfig(configDialogElement);
    game.configDialog.dialog('open');

};