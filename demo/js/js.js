(function() {

	var myGame = null;

	var _LEFT = 37;
	var _UP = 38;
	var _RIGHT = 39;
	var _DOWN = 40;

	var _1 = 49;
	var _2 = 50;
	var _3 = 51;
	var _4 = 52;
	var _5 = 53;

	function doKeyDown(evt){
		var key = evt.keyCode;
		if ( key == _LEFT ) {
			myGame.turn(-1);
			evt.preventDefault();
		} else if ( key == _UP ) {
			myGame.move(1);
			evt.preventDefault();
		} else if ( key == _RIGHT ) {
			myGame.turn(1);
			evt.preventDefault();
		} else if ( key == _DOWN ) {
			myGame.move(-1);
			evt.preventDefault();
		} else if ( key == _1 ) {
			myGame.scale = 1;
			evt.preventDefault();
		} else if ( key == _2 ) {
			myGame.scale = 2;
			evt.preventDefault();
		} else if ( key == _3 ) {
			myGame.scale = 4;
			evt.preventDefault();
		} else if ( key == _4 ) {
			myGame.scale = 8;
			evt.preventDefault();
		} else if ( key == _5 ) {
			myGame.scale = 16;
			evt.preventDefault();
		}
	}

	function init() {
		myGame = new MyGame('my-canvas');
		myGame.start();
		window.addEventListener('keydown', doKeyDown, true);
	}

	window.addEventListener('load', init, false);	

})();