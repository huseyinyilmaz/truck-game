"strict mode";
game.initTruck = (function(){
		      var truckProto = {
			  move:function(x,y,duration){
			      logger.startLog('ballProto.move');
			      if(typeof duration === 'undefined'){
				  var transform = 'translate('+x+','+y+') scale(0.8)';
				  this.DOM.setAttributeNS(null,'transform',transform);
				  logger.log('transform',transform);
			      }else{
				  var animation = this.animation;
				  animation.setAttributeNS(null,'to',x + ',' + y);
				  animation.setAttributeNS(null,'dur',duration);
				  animation.beginElement();
				  logger.log('Started animation with' + x +','+y+' in ' + duration);
			      }
			      this.x = x;
			      this.y = y;
			      logger.endLog();
			      },
			  defaultTruckLocationx:220
		      };
		      return function(){
			  var domElement = document.getElementById('truck');
			  var animation = document.getElementById('truckAnimation');
			  var truck = Object.create(
			      truckProto,
			      {DOM:{value:domElement},
			       animation:{value:animation},
			       x:{value:220},
			       y:{value:220}
			      } );

			  game.truck = truck;
		      };
		  }());
