(function() {

	var myGame = null;

	function init() {
		myGame = new MyGame('my-canvas');
		myGame.start();
		myGame.test();
		window.addEventListener('keydown', function(evt) { myGame.doKeyDown(evt); }, true);
		window.addEventListener('keyup', function(evt) { myGame.doKeyUp(evt); }, true);
	}

	window.addEventListener('load', init, false);	

})();