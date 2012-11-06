(function() {

	var myGame = null;

	var _LEFT = 37;
	var _UP = 38;
	var _RIGHT = 39;
	var _DOWN = 40;

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
		}
	}

	function init() {
		myGame = new MyGame('my-canvas');
		myGame.start();
		window.addEventListener('keydown', doKeyDown, true);
	}

	window.addEventListener('load', init, false);	

})();