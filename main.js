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
    initConfig:function(element){

    }
};

window.onload=function(){
    game.svg = document.getElementById('svgContainer');
    var balls = ['red','green','blue','yellow'];

    game.initTruck();
    game.initializeballs(balls);
    game.truck.move(600,0,'3s');
};