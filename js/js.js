(function() {

	function init() {
		var myGame = new MyGame('my-canvas');
		myGame.start();
	}

	window.addEventListener('load', init, false);	

})();