"strict mode";
game.initTruck = (function(){
		      
		      var truckProto = {
	
		      };
		      return function(){
			  var domElement = document.getElementById('truck');
			  
			  var truck = {
			      DOM:domElement
			  };
			  truck.__proto__ = truckProto;
			  game.truck = truck;
		      };
		  }());
